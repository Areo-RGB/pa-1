import type { ReactNode } from 'react'
import { Header } from './header'
import { Main } from './main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'

interface PageLayoutProps {
  children: ReactNode
  showSearch?: boolean
  showThemeSwitch?: boolean
  showProfile?: boolean
  headerContent?: ReactNode
  fixed?: boolean
}

export function PageLayout({
  children,
  showSearch = true,
  showThemeSwitch = true,
  showProfile = true,
  headerContent,
  fixed = true,
}: PageLayoutProps) {
  return (
    <>
      <Header fixed={fixed} showLogo>
        {showSearch && <Search />}
        
        {headerContent}
        
        <div className='ml-auto flex items-center space-x-4'>
          {showThemeSwitch && <ThemeSwitch />}
          {showProfile && <ProfileDropdown />}
        </div>
      </Header>

      <Main fixed={fixed}>
        {children}
      </Main>
    </>
  )
}

PageLayout.displayName = 'PageLayout' 