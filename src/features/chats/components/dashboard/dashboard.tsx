import Content from "./content"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <Card className="p-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl -z-10"></div>
        <Content />
      </div>
    </Card>
  )
} 