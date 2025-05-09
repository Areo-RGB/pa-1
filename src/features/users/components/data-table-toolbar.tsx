import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userTypes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // Get unique values for kategorie and uebung
  const categories = ['Schnelligkeit', 'Beweglichkeit', 'Technik', 'Ausdauer', 'Gewandtheit'];
  const exercises = ['10m Sprint', '20m Sprint', 'Gewandtheit', 'Dribbling', 'Balljonglieren', 'Ballkontrolle', 'YoYo IR1'];
  
  // Performance categories with more visible colors
  const performanceCategories = [
    { label: 'Hervorragend', value: 'hervorragend', color: 'bg-green-600 text-white' },
    { label: 'Sehr gut', value: 'sehr gut', color: 'bg-green-400 text-black' },
    { label: 'Gut', value: 'gut', color: 'bg-yellow-500 text-black' },
    { label: 'Durchschnittlich', value: 'durchschnittlich', color: 'bg-orange-500 text-white' },
    { label: 'Unterdurchschnittlich', value: 'unterdurchschnittlich', color: 'bg-red-500 text-white' },
    { label: 'Sehr schwach', value: 'sehr schwach', color: 'bg-red-700 text-white' },
    { label: 'Unknown', value: 'unknown', color: 'bg-gray-400 text-white' },
  ];

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter athletes...'
          value={
            (table.getColumn('firstName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('kategorie') && (
            <DataTableFacetedFilter
              column={table.getColumn('kategorie')}
              title='Category'
              options={categories.map(category => ({ label: category, value: category }))}
            />
          )}
          {table.getColumn('uebung') && (
            <DataTableFacetedFilter
              column={table.getColumn('uebung')}
              title='Exercise'
              options={exercises.map(exercise => ({ label: exercise, value: exercise }))}
            />
          )}
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Performance'
              options={performanceCategories}
            />
          )}
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Role'
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
