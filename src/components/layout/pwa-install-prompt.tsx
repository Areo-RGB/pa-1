import * as React from 'react'
import { Download } from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

// Platform detection utilities
const getPlatform = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(userAgent)) return 'iOS'
  if (/android/.test(userAgent)) return 'Android'
  return 'Desktop'
}

const getBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (/chrome/.test(userAgent)) return 'Chrome'
  if (/firefox/.test(userAgent)) return 'Firefox'
  if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) return 'Safari'
  if (/edg/.test(userAgent)) return 'Edge'
  return 'Other'
}

const getInstallInstructions = () => {
  const platform = getPlatform()
  const browser = getBrowser()

  switch (platform) {
    case 'iOS':
      return 'Tap the Share button and select "Add to Home Screen"'
    case 'Android':
      if (browser === 'Chrome') {
        return 'Tap the menu (⋮) and select "Install app" or "Add to Home Screen"'
      } else if (browser === 'Firefox') {
        return 'Tap the menu (⋮) and select "Install"'
      } else {
        return 'Open in Chrome for the best installation experience'
      }
    case 'Desktop':
      if (browser === 'Chrome' || browser === 'Edge') {
        return 'Click the install icon (＋) in the address bar'
      } else if (browser === 'Firefox') {
        return 'Click the menu (≡) and select "Install app"'
      } else {
        return 'For the best experience, use Chrome, Edge, or Firefox'
      }
    default:
      return 'Install this app on your device'
  }
}

// Get platform-specific benefits
const getInstallBenefits = () => {
  const platform = getPlatform()
  switch (platform) {
    case 'iOS':
      return 'Get quick access from your home screen and enjoy a full-screen experience'
    case 'Android':
      return 'Use app offline, get notifications, and access device features'
    case 'Desktop':
      return 'Launch instantly from your desktop and work offline'
    default:
      return 'Use offline and get a better experience'
  }
}

// Check if the app is installable (has a beforeinstallprompt event)
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [, setIsInstallable] = React.useState(false)
  const { isMobile } = useSidebar()

  // Listen for the beforeinstallprompt event
  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Show the install prompt
        deferredPrompt.prompt()
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice
        
        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null)
        
        if (outcome === 'accepted') {
          toast.success('App installed successfully!')
        } else {
          // Show benefits to encourage installation
          toast.info(getInstallBenefits(), {
            duration: 5000
          })
        }
      } catch (error) {
        console.error('Install prompt error:', error)
        toast.error('Installation failed. Please try manual installation.')
      }
    } else {
      // Show platform-specific installation instructions with benefits
      toast.info(getInstallInstructions(), {
        description: getInstallBenefits(),
        duration: 5000
      })
    }
  }

  // Always render the button, regardless of installability
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                size='lg'
                onClick={handleInstallClick}
                className='bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90'
              >
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <Download className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    Install App
                  </span>
                  <span className='truncate text-xs'>{getPlatform() === 'Desktop' ? 'Install on desktop' : 'Add to home screen'}</span>
                </div>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent
              side={isMobile ? 'bottom' : 'right'}
              align='start'
              sideOffset={4}
            >
              {getInstallInstructions()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 