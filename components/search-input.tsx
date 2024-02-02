"use client"

import { useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Badge } from "./ui/badge"

export function SearchInput() {
  const [suggestions, setSuggestions] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/words?query=${searchInput}`
      )
      const data = await response.json()
      setSuggestions(data)
    }
    fetchData()
  }, [searchInput])
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <SearchIcon className="top-1/2 left-2 absolute transform -translate-y-1/2" />
        <Input
          className="pl-12"
          id="search"
          type="text"
          placeholder="Search until your heart is content..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        {suggestions && suggestions.length
          ? suggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer"
                onClick={() => console.log(suggestion)}
              >
                {suggestion}
              </Badge>
            ))
          : null}
      </div>
    </div>
  )
}
