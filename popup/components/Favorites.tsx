import { useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import { Favorite } from "./Favorite"
import { NothingToShow } from "./NothingToShow"

import { getSortFunction, useSearch } from "../utils"
import type { ISorting } from "types/sorting"
import type { ICollection, TypefaceTuple } from "types/typeface"
import type { SupportedWebsite } from "~types/website"

export const Favorites = () => {
  const [searchQuery] = useStorage("searchQuery", "")
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [method] = useStorage<ISorting["method"]>("sortMethod", "alphabetical")
  const [direction] = useStorage<ISorting["direction"]>("sortDirection", "ascending")
  const [collections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<SupportedWebsite[]>(
    "visibleOriginWebsites",
    []
  )

  useEffect(() => {
    const uniqueOrigins = [...new Set(favorites.map((favorite) => favorite[1].origin.name))]
    uniqueOrigins.forEach((origin) => {
      if (!visibleOrigins.includes(origin)) {
        setVisibleOrigins((prev) => [...prev, origin])
      }
    })
  }, [])

  const filterByOrigin = (favorites: TypefaceTuple[]) => {
    return [...favorites].filter((favorite) => visibleOrigins.includes(favorite[1].origin.name))
  }

  const filterByCollection = (favorites: TypefaceTuple[]) => {
    return [...favorites].filter((favorite) => {
      const results = collections.filter((collection) =>
        collection.typefaces.includes(favorite[1].slug)
      )
      if (results.length === 0) return true
      return results.some((collection) => !collection.hidden)
    })
  }

  const filteredFavorites = useSearch(
    searchQuery,
    filterByCollection(filterByOrigin(favorites)),
    (cleanQuery, normalize) => ({
      family: {
        propertyContainsQuery: ([, { family }]) => normalize(family).includes(cleanQuery),
        queryContainsProperty: ([, { family }]) => cleanQuery.includes(normalize(family))
      },
      origin: {
        propertyContainsQuery: ([, { origin }]) => normalize(origin.name).includes(cleanQuery),
        queryContainsProperty: ([, { origin }]) => cleanQuery.includes(normalize(origin.name))
      }
    }),
    (tuple) => tuple[1]
  )

  const filteredSortedFavorites = [...filteredFavorites].sort(
    getSortFunction({ method, direction })
  )

  if (favorites.length === 0) {
    return <NothingToShow>No fonts added</NothingToShow>
  }

  if (filteredSortedFavorites.length === 0) {
    return <NothingToShow>No fonts visible</NothingToShow>
  }

  return (
    <div id="favorites" className="h-[400px] overflow-auto">
      {filteredSortedFavorites.map((favorite) => (
        <Favorite key={crypto.randomUUID()} favorite={favorite[1]} />
      ))}
    </div>
  )
}
