"use client"

import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function Resume({
  id,
  name,
  description,
  url,
  onOpenDetails
}: {
  id: string
  name: string
  description: string
  url: string
  onOpenDetails: () => void
}) {
  return (
    <Card 
      className="w-75 cursor-pointer"
      onClick={onOpenDetails}
    >
      <CardHeader>
        <CardTitle className="truncate">
          {name}
        </CardTitle>
        <CardDescription className="line-clamp-2 break-words">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Button variant="ghost" size="sm" asChild className="h-8 px-2 ml-auto" onClick={e => e.stopPropagation()}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}