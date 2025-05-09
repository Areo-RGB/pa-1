import { createFileRoute } from '@tanstack/react-router'
import Bent from '@/features/bent'

export const Route = createFileRoute('/_authenticated/bent/')({
  component: Bent,
})