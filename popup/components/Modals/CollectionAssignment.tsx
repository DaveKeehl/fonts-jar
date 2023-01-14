import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"

import { modalOpenAtom, selectedTypefaceAtom } from "~popup/atoms"
import { Search } from "../Search"
import { Modal } from "./Modal"

import type { ICollection } from "~types/typeface"

export const CollectionAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const modalOpen = useAtomValue(modalOpenAtom)
  const selectedTypeface = useAtomValue(selectedTypefaceAtom)
  const [collections, setCollections] = useStorage<ICollection[]>(
    "collections",
    []
  )

  const filteredCollections = [...collections].filter(({ name }) => {
    const cleanQuery = searchQuery.trim().toLowerCase()
    const nameNormalized = name.toLowerCase()

    const nameContainsQuery = nameNormalized.includes(cleanQuery)
    const queryContainsName = cleanQuery.includes(nameNormalized)

    return nameContainsQuery || queryContainsName
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name !== e.target.name) {
          return collection
        }
        return {
          ...collection,
          typefaces: e.target.checked
            ? [...collection.typefaces, selectedTypeface]
            : collection.typefaces.filter((font) => font !== selectedTypeface)
        }
      })
    )
  }

  return (
    <Modal
      isModalOpen={modalOpen === "collection-assignment"}
      contentLabel="Collection Assignment Modal">
      <div className="flex max-w-[300px] flex-col gap-3 py-[18px] px-4">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10"
          iconClassName="left-3"
        />
        {filteredCollections.length === 0 ? (
          <p className="text-base">No collections.</p>
        ) : (
          <div className="flex w-full flex-col justify-start gap-1">
            {collections.map(({ name, typefaces }, idx) => (
              <label
                key={crypto.randomUUID()}
                className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={typefaces.includes(selectedTypeface)}
                  onChange={handleChange}
                />
                {name}
              </label>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
