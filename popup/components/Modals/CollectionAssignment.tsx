import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"

import { modalOpenAtom, selectedTypefaceSlugAtom } from "~popup/atoms"
import { Search } from "../Search"
import { Modal } from "./Modal"

import type { ICollection, TypefaceTuple } from "~types/typeface"

export const CollectionAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const modalOpen = useAtomValue(modalOpenAtom)
  const selectedTypefaceSlug = useAtomValue(selectedTypefaceSlugAtom)
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>(
    "collections",
    []
  )

  const selectedTypeface = favorites.find(
    (favorite) => favorite[0] === selectedTypefaceSlug
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
            ? [...collection.typefaces, selectedTypefaceSlug]
            : collection.typefaces.filter(
                (font) => font !== selectedTypefaceSlug
              )
        }
      })
    )
  }

  return (
    <Modal
      isModalOpen={modalOpen === "collection-assignment"}
      contentLabel="Collection Assignment Modal">
      <div className="flex max-w-[300px] flex-col gap-4 py-[18px] px-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Assign to collection</h2>
          {selectedTypeface && (
            <p className="text-sm">
              🏷️ Choose the collections <i>{selectedTypeface[1].family}</i>{" "}
              belongs to.
            </p>
          )}
        </div>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-greyscale-200"
          iconClassName="left-3"
        />
        {filteredCollections.length === 0 ? (
          <p className="text-base">No results.</p>
        ) : (
          <div className="flex w-full flex-col justify-start gap-1">
            {collections.map(({ name, typefaces }) => (
              <label
                key={crypto.randomUUID()}
                className="flex items-center gap-2 text-base hover:cursor-pointer">
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={typefaces.includes(selectedTypefaceSlug)}
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
