import { useAtomValue } from "jotai"

import { Favorite } from "./Favorite"
import { NothingToShow } from "./NothingToShow"

import { searchQueryAtom, sortDirectionAtom, sortMethodAtom } from "../atoms"
import { validTypefaces as favorites } from "../../mocks/favorites"
import { getSortFunction } from "../utils"

export const Favorites = () => {
  const searchQuery = useAtomValue(searchQueryAtom)
  const method = useAtomValue(sortMethodAtom)
  const direction = useAtomValue(sortDirectionAtom)

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
