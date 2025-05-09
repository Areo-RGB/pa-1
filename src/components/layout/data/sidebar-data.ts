import {
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { AudioWaveform, GalleryVerticalEnd, Video, BarChart } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Finley',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Bent',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Home',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Fortschritt',
          url: '/tasks',
          icon: Video,
        },
        {
          title: 'Statistik',
          url: '/users',
          icon: BarChart,
        },
      ],
    },
  ],
}
