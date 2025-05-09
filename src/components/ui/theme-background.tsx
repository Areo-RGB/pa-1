import { useTheme } from '@/context/theme-context'

export function ThemeBackground() {
  const { theme } = useTheme()
  
  // Only render the animated background in dark mode
  if (theme !== 'dark') {
    return null
  }
  
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] select-none">
      {/* Base dark background - now uses theme variable */}
      <div className="relative h-full w-full bg-background">
        {/* Animated radial gradient */}
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,var(--background))] animate-pulse-slow opacity-20" />
      </div>
    </div>
  )
}