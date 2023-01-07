import { useStorage } from "@plasmohq/storage/hook"

import { Favorite } from "./Favorite"
import { NothingToShow } from "./NothingToShow"

import { getSortFunction } from "../utils"
import type { ISorting } from "~types/sorting"

export const Favorites = () => {
  const [searchQuery] = useStorage("searchQuery", "")
  const [favorites] = useStorage("favorites", [])
  const [method] = useStorage<ISorting["method"]>("sortMethod", "alphabetical")
  const [direction] = useStorage<ISorting["direction"]>("sortDirection", "ascending")

  const results = [...favorites]
    .sort(getSortFunction({ method, direction }))
    .filter((favorite) =>
      favorite[1].family.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

  if (favorites.length === 0) {
    return <NothingToShow>No fonts added</NothingToShow>
  }

  if (results.length === 0) {
    return <NothingToShow>No results</NothingToShow>
  }

  return (
    <div id="favorites">
      {results.map((favorite) => (
        <Favorite key={crypto.randomUUID()} favorite={favorite[1]} />
      ))}
    </div>
  )
}
