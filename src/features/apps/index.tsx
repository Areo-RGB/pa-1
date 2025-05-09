import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { FocusCards } from '@/components/ui/focus-cards'
import portraitImage from '@/assets/Finley_portrait.png'

export default function Apps() {
  // Using the existing image multiple times as placeholders
  const cards = [
    {
      title: "Mai 2025",
      src: portraitImage,
      videoSrc: "https://data3.fra1.cdn.digitaloceanspaces.com/Timeline%201%20(2).mp4",
    },
    {
      title: "Analytics Dashboard",
      src: portraitImage,
      videoSrc: "https://data3.fra1.cdn.digitaloceanspaces.com/g.mp4",
    },
    {
      title: "Task Management",
      src: portraitImage,
      videoSrc: "https://data3.fra1.cdn.digitaloceanspaces.com/g.mp4",
    },
  ]

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main fixed className="bg-black text-white">
        <div className="mb-8">
          <h1 className='text-2xl font-bold tracking-tight'>
            App Gallery
          </h1>
          <p className='text-gray-400'>
            Interactive application showcases with video previews on hover
          </p>
        </div>
        
        <div className="py-4 bg-transparent">
          <FocusCards cards={cards} className="[&_.video-container]:aspect-video [&_video]:object-cover" />
        </div>
      </Main>
    </>
  )
}
