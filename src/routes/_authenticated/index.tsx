import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated/')({
  component: RedirectToStatistiken,
})

function RedirectToStatistiken() {
  const navigate = useNavigate()

  useEffect(() => {
    // Get the path from the router's route definitions
    navigate({ 
      to: '/statistiken/performance-dashboard',
      replace: true 
    })
  }, [navigate])

  return null
}
