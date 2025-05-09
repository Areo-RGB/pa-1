import * as React from 'react'
import { ChevronsUpDown, Home } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// Storage key for the selected team
const SELECTED_TEAM_KEY = 'selected-header-team'

// Virtual Home team
const HOME_TEAM = {
  name: 'Home',
  logo: Home,
  plan: ''
}

export function HeaderTeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  // Initialize active team from localStorage if available
  const [activeTeam, setActiveTeam] = React.useState(() => {
    const savedTeamName = localStorage.getItem(SELECTED_TEAM_KEY)
    if (savedTeamName === 'Home') {
      return HOME_TEAM
    } else if (savedTeamName) {
      const savedTeam = teams.find(team => team.name === savedTeamName)
      return savedTeam || teams[0]
    }
    return teams[0]
  })
  
  const navigate = useNavigate()

  const handleTeamSelect = (team: typeof teams[0]) => {
    // Set and persist the active team
    setActiveTeam(team)
    localStorage.setItem(SELECTED_TEAM_KEY, team.name)
    
    // Navigate based on team name
    if (team.name === 'Finley') {
      navigate({ to: '/tasks' })
    } else if (team.name === 'Bent') {
      navigate({ to: '/users' })
    }
  }

  // Get alternative teams (all teams except the active one)
  const alternativeTeams = teams.filter(team => team.name !== activeTeam.name)
  
  // Handle home navigation and set Home as active team
  const handleHomeClick = () => {
    // Set virtual Home team as active
    setActiveTeam(HOME_TEAM)
    localStorage.setItem(SELECTED_TEAM_KEY, 'Home')
    
    // Navigate to home
    navigate({ to: '/' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1 px-2"
        >
          <div className='bg-primary text-primary-foreground flex aspect-square size-6 items-center justify-center rounded-md'>
            <activeTeam.logo className='size-3.5' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {activeTeam.name}
            </span>
          </div>
          <ChevronsUpDown className='ml-1 size-4 opacity-70' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 rounded-lg'
        align='start'
        side='bottom'
        sideOffset={4}
      >
        <DropdownMenuLabel className='text-muted-foreground text-xs'>
          Teams
        </DropdownMenuLabel>
        {alternativeTeams.map((team) => {
          return (
            <DropdownMenuItem
              key={team.name}
              onClick={() => handleTeamSelect(team)}
              className='gap-2 p-2'
            >
              <div className='flex size-6 items-center justify-center rounded-sm border'>
                <team.logo className='size-4 shrink-0' />
              </div>
              {team.name}
            </DropdownMenuItem>
          )
        })}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className='gap-2 p-2'
          onClick={handleHomeClick}
        >
          <div className='flex size-6 items-center justify-center rounded-sm border'>
            <Home className='size-4 shrink-0' />
          </div>
          <div className='font-medium'>Home</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}