import { ResponsiveImage } from '@/components/ui/responsive-image';

export function ResponsiveImageDemo() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Responsive Image Examples</h2>
      
      {/* Basic usage */}
      <div>
        <h3 className="text-xl font-medium mb-2">Basic Usage</h3>
        <ResponsiveImage 
          src="/images/shadcn-admin.png" 
          alt="Basic example" 
          width={800} 
          height={450}
          className="rounded-lg" 
        />
      </div>
      
      {/* Different sizes for different screen sizes */}
      <div>
        <h3 className="text-xl font-medium mb-2">Different sizes for different screens</h3>
        <ResponsiveImage 
          src="/images/shadcn-admin.png" 
          alt="Responsive sizes example"
          width={1200}
          height={600}
          aspectRatio="16/9"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg" 
        />
      </div>
      
      {/* With different sources for different screen sizes */}
      <div>
        <h3 className="text-xl font-medium mb-2">Different sources for different screen sizes</h3>
        <p className="text-muted-foreground mb-4">
          This example would load different image files based on screen size. 
          You would need to prepare these images at different dimensions.
        </p>
        <ResponsiveImage 
          src="/images/shadcn-admin.png" 
          alt="Multiple sources example"
          width={1200}
          height={600}
          aspectRatio="16/9"
          className="rounded-lg"
          sources={[
            {
              srcSet: "/images/shadcn-admin.png",
              media: "(max-width: 640px)",
            },
            {
              srcSet: "/images/shadcn-admin.png",
              media: "(max-width: 1024px)",
            }
          ]}
        />
      </div>
      
      {/* Object fit cover vs contain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-medium mb-2">Object-fit: cover</h3>
          <ResponsiveImage 
            src="/images/shadcn-admin.png" 
            alt="Object-fit cover example"
            width={400}
            height={400}
            aspectRatio="1/1"
            objectFit="cover"
            className="rounded-lg" 
          />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Object-fit: contain</h3>
          <ResponsiveImage 
            src="/images/shadcn-admin.png" 
            alt="Object-fit contain example"
            width={400}
            height={400}
            aspectRatio="1/1"
            objectFit="contain"
            className="rounded-lg bg-gray-100 dark:bg-gray-800" 
          />
        </div>
      </div>
    </div>
  );
} 