"use client"

import { useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Badge } from "./ui/badge"
import { useDebounce } from "@/lib/hooks/use-debounce"
import useKeypress from "@/lib/hooks/use-keypress"

export function SearchInput() {
  const [suggestions, setSuggestions] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const debouncedSearchInput = useDebounce(searchInput, 200)
  // useKeypress("Escape", () => setSearchInput(""))
  useKeypress("Tab", (event) => {
    event.preventDefault()
    if (!suggestions.length) return
    setSearchInput(suggestions[0])
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/words?query=${debouncedSearchInput}`
      )
      const data = await response.json()
      setSuggestions(data)
    }
    fetchData()
  }, [debouncedSearchInput])

  function handleSearch(q: string) {
    setSearchInput(q)
  }
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
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {suggestions && suggestions.length
          ? suggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="whitespace-nowrap cursor-pointer"
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
