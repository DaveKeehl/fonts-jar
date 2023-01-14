import { useEffect, useRef, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"
import { Eye, EyeClosed, Trash } from "phosphor-react"

import { Search } from "../Search"
import { Modal } from "./Modal"

import { modalOpenAtom } from "~popup/atoms"
import type { ICollection, TypefaceTuple } from "~types/typeface"

export const CollectionsManager = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [newCollection, setNewCollection] = useState("")
  const [cursor, setCursor] = useState(null)
  const modalOpen = useAtomValue(modalOpenAtom)
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>(
    "collections",
    []
  )

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (input) input.setSelectionRange(cursor, cursor)
  }, [inputRef, cursor, collections])

  const filteredCollections = [...collections].filter(({ name, typefaces }) => {
    const cleanQuery = searchQuery.trim().toLowerCase()
    const nameNormalized = name.toLowerCase()

    const nameContainsQuery = nameNormalized.includes(cleanQuery)
    const queryContainsName = cleanQuery.includes(nameNormalized)
    const typefacesContainQuery = typefaces.some((typeface) => {
      const queryTerms = cleanQuery.split(" ")
      return queryTerms.some((term) => {
        const cleanTypeface = typeface.trim().toLowerCase()
        const cleanTerm = term.trim().toLowerCase()
        return cleanTypeface.includes(cleanTerm)
      })
    })

    return nameContainsQuery || queryContainsName || typefacesContainQuery
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCollection(e.target.value)
  }

  const toggleVisibility = (name: string) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name === name) {
          return { ...collection, hidden: !collection.hidden }
        }
        return collection
      })
    )
  }

  const handleDelete = (name: string) => {
    setCollections((prev) =>
      prev.filter((collection) => collection.name !== name)
    )
  }

  const updateCollectionName = (oldName: string, newName: string) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name !== oldName) return collection
        return {
          ...collection,
          name: newName
        }
      })
    )
  }

  const handleUpdateName = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setCursor(e.target.selectionStart)
    updateCollectionName(name, e.target.value)
  }

  const handleUpdateNameAfterLostFocus = (name: string) => {
    updateCollectionName(name, name.trim())
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCollections((prev) => [
      ...prev,
      {
        name: newCollection,
        typefaces: [],
        hidden: false
      }
    ])
    setNewCollection("")
    e.currentTarget.blur()
  }

  return (
    <Modal
      isModalOpen={modalOpen === "collections-manager"}
      contentLabel="Collections Manager Modal">
      <div className="flex flex-col gap-4 px-5 py-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Collections</h2>
          <p className="text-sm">
            ⚠️ Deleting a collection will not delete its fonts.
          </p>
        </div>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-greyscale-200"
          iconClassName="left-3"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[3px]">
            {filteredCollections.length === 0 ? (
              <p className="text-base">No results.</p>
            ) : (
              filteredCollections.map(({ name, typefaces, hidden }, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border-b-[1px] border-greyscale-200 py-[6px] last:border-0">
                  <div>
                    <input
                      type="text"
                      className="text-base font-normal leading-[24px] focus-visible:outline-0"
                      value={name}
                      onChange={(e) => handleUpdateName(e, name)}
                      onBlur={() => handleUpdateNameAfterLostFocus(name)}
                      ref={inputRef}
                    />
                    <p className="truncate-custom leading-4 text-greyscale-600">
                      {typefaces.length === 0
                        ? "No fonts added"
                        : typefaces
                            .map((slug) => {
                              const typeface = favorites.find(
                                (favorite) => favorite[0] === slug
                              )

                              if (typeface) return typeface[1].family
                              return slug
                            })
                            .join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div onClick={() => toggleVisibility(name)}>
                      {hidden ? (
                        <EyeClosed
                          size={20}
                          weight="bold"
                          color="black"
                          className="opacity-40 hover:cursor-pointer"
                        />
                      ) : (
                        <Eye
                          size={20}
                          weight="bold"
                          color="black"
                          className="hover:cursor-pointer"
                        />
                      )}
                    </div>
                    <Trash
                      size={20}
                      weight="bold"
                      color="red"
                      className="hover:cursor-pointer"
                      onClick={() => handleDelete(name)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="New collection name"
              className="w-full text-base placeholder:text-greyscale-400 focus-visible:outline-0"
              value={newCollection}
              onChange={handleChange}
            />
            <input
              type="submit"
              value="Add"
              className="rounded bg-green-500 px-[10px] py-1 text-sm font-medium leading-[24px] text-white hover:cursor-pointer hover:bg-green-600 active:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-300"
              disabled={newCollection === ""}
            />
          </form>
        </div>
      </div>
    </Modal>
  )
}
