import * as React from 'react';
import { cn } from '@/lib/utils';

interface ImageSource {
  srcSet: string;
  media?: string;
  type?: string;
}

export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sources?: ImageSource[];
  sizes?: string;
  lazy?: boolean;
  placeholder?: string;
  fallback?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * ResponsiveImage component
 * 
 * Renders an image with responsive behavior using <picture> element and srcSet
 * 
 * Features:
 * - Multiple image sources with different resolutions
 * - WebP format support with fallbacks
 * - Lazy loading
 * - Aspect ratio preservation
 * - Placeholder image support
 * - Error handling with fallback image
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  sources = [],
  sizes = '100vw',
  lazy = true,
  placeholder,
  fallback = '/images/shadcn-admin.png',
  aspectRatio = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  ...props
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = React.useState<string>(placeholder || src);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Reset states when src changes
    setImgSrc(placeholder || src);
    setIsLoaded(false);
    setHasError(false);
  }, [src, placeholder]);

  const handleLoad = React.useCallback(() => {
    setIsLoaded(true);
    setImgSrc(src);
  }, [src]);

  const handleError = React.useCallback(() => {
    setHasError(true);
    setImgSrc(fallback);
  }, [fallback]);

  // Create responsive image srcSet with different sizes
  const defaultSrcSet = !sources.length && width
    ? `${src} ${width}w, ${src.replace(/\.(jpg|jpeg|png|webp)/, '@2x.$1')} ${width * 2}w, ${src.replace(/\.(jpg|jpeg|png|webp)/, '@3x.$1')} ${width * 3}w`
    : undefined;

  const imageStyle: React.CSSProperties = {
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
    objectFit,
    objectPosition,
  };

  return (
    <picture>
      {/* Display WebP source if available */}
      {sources.map((source, index) => (
        <source key={index} srcSet={source.srcSet} media={source.media} type={source.type} />
      ))}
      
      {/* Add a WebP source with the same dimensions as default */}
      {defaultSrcSet && (
        <source 
          srcSet={defaultSrcSet.replace(/\.(jpg|jpeg|png)/g, '.webp')} 
          type="image/webp"
        />
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={defaultSrcSet}
        loading={lazy ? "lazy" : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100',
          hasError && 'grayscale opacity-70',
          className
        )}
        style={imageStyle}
        {...props}
      />
    </picture>
  );
} 