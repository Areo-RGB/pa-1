import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated/statistiken/')({
  component: StatistikenIndex,
})

function StatistikenIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to the performance dashboard
    navigate({ to: '/statistiken/performance-dashboard' })
  }, [navigate])

  return null
} 