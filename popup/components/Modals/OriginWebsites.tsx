import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"

import { modalOpenAtom } from "~popup/atoms"
import { Search } from "../Search"
import { Modal } from "./Modal"

import type { TypefaceTuple } from "~types/typeface"
import type { SupportedWebsite } from "~types/website"

export const OriginWebsites = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const modalOpen = useAtomValue(modalOpenAtom)
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])

  const uniqueOrigins = [...new Set(favorites.map((favorite) => favorite[1].origin.name))]

  // const filteredCollections = [...collections].filter(({ name }) => {
  //   const cleanQuery = searchQuery.trim().toLowerCase()
  //   const nameNormalized = name.toLowerCase()

  //   const nameContainsQuery = nameNormalized.includes(cleanQuery)
  //   const queryContainsName = cleanQuery.includes(nameNormalized)

  //   return nameContainsQuery || queryContainsName
  // })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const origin = e.target.name

    if (visibleOrigins.includes(origin)) {
      setVisibleOrigins((prev) => prev.filter((visibleOrigin) => visibleOrigin !== origin))
    } else {
      setVisibleOrigins((prev) => [...prev, origin])
    }
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
        {uniqueOrigins.length === 0 ? (
          <p className="text-base">No origins.</p>
        ) : (
          <div className="flex w-full flex-col justify-start gap-1">
            {uniqueOrigins.map((origin) => (
              <label
                key={crypto.randomUUID()}
                className="flex items-center gap-2 text-base hover:cursor-pointer">
                <input
                  type="checkbox"
                  id={origin}
                  name={origin}
                  checked={visibleOrigins.includes(origin)}
                  onChange={handleChange}
                />
                {origin}
              </label>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
