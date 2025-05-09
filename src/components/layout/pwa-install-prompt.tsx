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
      // Show the install prompt
      deferredPrompt.prompt()
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      
      // We've used the prompt, and can't use it again, discard it
      setDeferredPrompt(null)
      
      if (outcome === 'accepted') {
        toast.success('App installed successfully!')
      }
    } else {
      // Show a message that explains how to install manually
      toast.info('To install this app: Open in Chrome, click menu (⋮) and select "Install app"')
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
                  <span className='truncate text-xs'>Use offline</span>
                </div>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent
              side={isMobile ? 'bottom' : 'right'}
              align='start'
              sideOffset={4}
            >
              Install this app on your device
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 