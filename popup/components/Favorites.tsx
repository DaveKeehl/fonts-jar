import { useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"

import { TypefaceItem } from "~/popup/components/Typeface"
import { NothingToShow } from "~/popup/components/NothingToShow"

import { getSortFunction, useSearch } from "~/popup/utils"
import type { Sorting } from "~/types/sorting"
import type { Collection, TypefaceTuple } from "~/types/typeface"
import type { SupportedWebsite } from "~/types/website"

export const Favorites = () => {
  const [searchQuery] = useStorage("searchQuery", "")
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [method] = useStorage<Sorting["method"]>("sortMethod", "alphabetical")
  const [direction] = useStorage<Sorting["direction"]>("sortDirection", "ascending")
  const [collections] = useStorage<Collection[]>("collections", [])
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
        <TypefaceItem key={crypto.randomUUID()} typeface={favorite[1]} />
      ))}
    </div>
  )
}
