import { ChevronRight } from "lucide-react"

export function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <span className="hover:text-foreground cursor-pointer">Home</span>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">Casual</span>
    </nav>
  )
}
