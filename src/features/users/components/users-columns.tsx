import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Athlete' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('firstName')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'kategorie',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('kategorie')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
  },
  {
    accessorKey: 'uebung',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Exercise' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('uebung')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
  },
  {
    accessorKey: 'ergebnis',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Result' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('ergebnis')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Performance' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      
      // Performance category colors
      const getColorClass = (status: string) => {
        switch (status) {
          case "sehr schwach":
            return "bg-transparent border border-red-700 text-red-700"
          case "unterdurchschnittlich":
            return "bg-transparent border border-red-500 text-red-500"
          case "durchschnittlich":
            return "bg-transparent border border-orange-500 text-orange-500"
          case "gut":
            return "bg-transparent border border-yellow-500 text-yellow-500"
          case "sehr gut":
            return "bg-transparent border border-green-400 text-green-600"
          case "hervorragend":
            return "bg-transparent border border-green-600 text-green-600"
          default:
            return "bg-transparent border border-gray-400 text-gray-400"
        }
      }
      
      return (
        <div className='flex items-center space-x-2'>
          <Badge className={cn('capitalize', getColorClass(status as string))}>
            {status}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{row.getValue('role')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
