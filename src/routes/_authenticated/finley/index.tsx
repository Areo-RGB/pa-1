import { createFileRoute } from '@tanstack/react-router'
import Finley from '@/features/finley'

export const Route = createFileRoute('/_authenticated/finley/')({
  component: Finley,
})
