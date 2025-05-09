import {
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { BarChart, Video } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    // Removed Finley and Bent entries from teams array
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
          title: 'Videos',
          url: '/videos',
          icon: Video,
        },
        // Removed Finley entry
        // Removed Bent entry
        {
          title: 'Statistik',
          url: '/users',
          icon: BarChart,
        },
      ],
    },
  ],
}
