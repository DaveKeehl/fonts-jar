import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useAtomValue } from "jotai"
import { Eye, EyeClosed, Trash } from "phosphor-react"

import { Search } from "../Search"
import { Modal } from "./Modal"

import { modalOpenAtom } from "~popup/atoms"
import type { ICollection } from "~types/typeface"

export const CollectionsManager = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [newCollection, setNewCollection] = useState("")
  const modalOpen = useAtomValue(modalOpenAtom)
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

  const handleUpdateName = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name !== name) return collection
        return {
          ...collection,
          name: e.target.value
        }
      })
    )
    // e.currentTarget.focus()
  }

  // const handleUpdateNameAfterLostFocus = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   name: string
  // ) => {
  //   setCollections((prev) =>
  //     prev.map((collection) => {
  //       if (collection.name !== name) return collection
  //       return {
  //         ...collection,
  //         name: name.trim()
  //       }
  //     })
  //   )
  // }

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
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10"
          iconClassName="left-3"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[3px]">
            {filteredCollections.map(({ name, hidden }, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 border-b-[1px] border-greyscale-200 py-[6px] last:border-0">
                <input
                  type="text"
                  className="text-base font-normal leading-[24px] focus-visible:outline-0"
                  value={name}
                  onChange={(e) => handleUpdateName(e, name)}
                />
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
            ))}
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
