import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated/chats/')({
  component: ChatsIndex,
})

function ChatsIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to the new Statistiken route
    navigate({ to: '/statistiken' })
  }, [navigate])

  return null
}
