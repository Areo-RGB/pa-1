import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
// import { UserStatus } from './schema'

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
  // Custom team roles
  {
    label: '3.E',
    value: '3.E',
    icon: IconUsersGroup,
  },
  {
    label: 'U10',
    value: 'U10',
    icon: IconUsersGroup,
  },
  {
    label: 'U11',
    value: 'U11',
    icon: IconUsersGroup,
  },
] as const
