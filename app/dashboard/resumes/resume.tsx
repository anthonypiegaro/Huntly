"use client"

import { Button } from "@/components/ui/button"
import { 
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, SquareArrowOutUpRight } from "lucide-react"

export function Resume({
  id,
  name,
  description,
  url
}: {
  id: string
  name: string
  description: string
  url: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">
          {name}
        </CardTitle>
        <CardDescription className="line-clamp-2 break-words">
          {description}
        </CardDescription>
      </CardHeader>
      <Button variant="ghost" size="sm" asChild className="h-8 px-2" onClick={e => e.stopPropagation()}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-3 w-3" />
        </a>
      </Button>
    </Card>
  )
}