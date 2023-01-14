import { useStorage } from "@plasmohq/storage/hook"

import { Favorite } from "./Favorite"
import { NothingToShow } from "./NothingToShow"

import { getSortFunction } from "../utils"
import type { ISorting } from "types/sorting"
import type { ICollection, TypefaceTuple } from "types/typeface"

export const Favorites = () => {
  const [searchQuery] = useStorage("searchQuery", "")
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [method] = useStorage<ISorting["method"]>("sortMethod", "alphabetical")
  const [direction] = useStorage<ISorting["direction"]>(
    "sortDirection",
    "ascending"
  )
  const [collections] = useStorage<ICollection[]>("collections", [])

  const results = [...favorites]
    .filter((favorite) => {
      const results = collections.filter((collection) =>
        collection.typefaces.includes(favorite[1].slug)
      )
      if (results.length === 0) return true
      return results.some((collection) => !collection.hidden)
    })
    .filter((favorite) => {
      const cleanQuery = searchQuery.trim().toLowerCase()
      const { family, origin } = favorite[1]

      const familyNormalized = family.toLowerCase()
      const originNormalized = origin.name.toLowerCase()

      const familyContainsQuery = familyNormalized.includes(cleanQuery)
      const originContainsQuery = originNormalized.includes(cleanQuery)
      const queryContainsFamily = cleanQuery.includes(familyNormalized)
      const queryContainsOrigin = cleanQuery.includes(originNormalized)

      return (
        familyContainsQuery ||
        originContainsQuery ||
        queryContainsFamily ||
        queryContainsOrigin
      )
    })
    .sort(getSortFunction({ method, direction }))

  if (favorites.length === 0) {
    return <NothingToShow>No fonts added</NothingToShow>
  }

  if (results.length === 0) {
    return <NothingToShow>No fonts visible</NothingToShow>
  }

  return (
    <div id="favorites">
      {results.map((favorite) => (
        <Favorite key={crypto.randomUUID()} favorite={favorite[1]} />
      ))}
    </div>
  )
}
