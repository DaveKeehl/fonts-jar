import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"

import { modalOpenAtom } from "~popup/atoms"
import { Search } from "../Search"
import { Modal } from "./Modal"

import type { TypefaceTuple } from "~types/typeface"
import { useSearch } from "~popup/utils"

const Origins = ({
  uniqueOrigins,
  filteredOrigins,
  visibleOrigins,
  onChange
}: {
  uniqueOrigins: string[]
  filteredOrigins: string[]
  visibleOrigins: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  if (uniqueOrigins.length === 0 && filteredOrigins.length === 0) {
    return <p className="text-base">No origins.</p>
  }

  if (uniqueOrigins.length > 0 && filteredOrigins.length === 0) {
    return <p className="text-base">No results.</p>
  }

  return (
    <div className="flex w-full flex-col justify-start gap-1">
      {filteredOrigins.map((origin) => (
        <label
          key={crypto.randomUUID()}
          className="flex items-center gap-2 text-base hover:cursor-pointer">
          <input
            type="checkbox"
            id={origin}
            name={origin}
            checked={visibleOrigins.includes(origin)}
            onChange={onChange}
          />
          {origin}
        </label>
      ))}
    </div>
  )
}

export const OriginWebsites = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const modalOpen = useAtomValue(modalOpenAtom)
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])

  const uniqueOrigins = [...new Set(favorites.map((favorite) => favorite[1].origin.name))]

  const filteredOrigins = useSearch(
    searchQuery,
    uniqueOrigins,
    (cleanQuery, normalize) => ({
      origin: {
        propertyContainsQuery: (origin) => normalize(origin).includes(cleanQuery),
        queryContainsProperty: (origin) => cleanQuery.includes(normalize(origin))
      }
    }),
    (item) => ({ origin: item })
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const origin = e.target.name

    setVisibleOrigins((prev) => {
      if (!visibleOrigins.includes(origin)) return [...prev, origin]
      return prev.filter((visibleOrigin) => visibleOrigin !== origin)
    })
  }

  return (
    <Modal isModalOpen={modalOpen === "origin-websites"} contentLabel="Origin Websites Modal">
      <div className="flex max-w-[300px] flex-col gap-4 py-[18px] px-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Origin Websites</h2>
          <p className="text-sm">🌐 Filter your fonts based on their origin website.</p>
        </div>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-greyscale-200"
          iconClassName="left-3"
        />
        <Origins
          uniqueOrigins={uniqueOrigins}
          visibleOrigins={visibleOrigins}
          filteredOrigins={filteredOrigins}
          onChange={handleChange}
        />
      </div>
    </Modal>
  )
}
