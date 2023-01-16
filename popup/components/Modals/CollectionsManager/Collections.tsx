import { Collection } from "./Collection"

import type { ICollection, TypefaceTuple } from "~types/typeface"

interface ICollections {
  collections: ICollection[]
  filteredCollections: ICollection[]
  updatedName: { prev: string; updated: string }
  favorites: TypefaceTuple[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
  onBlur: (name: string) => void
  onToggleVisibility: (name: string) => void
  onDelete: (name: string) => void
}

export const Collections = ({
  collections,
  filteredCollections,
  updatedName,
  favorites,
  onChange,
  onBlur,
  onDelete,
  onToggleVisibility
}: ICollections) => {
  if (collections.length === 0 && filteredCollections.length === 0) {
    return <p className="text-base">No collections.</p>
  }

  if (collections.length > 0 && filteredCollections.length === 0) {
    return <p className="text-base">No results.</p>
  }

  return (
    <div className="flex flex-col gap-[3px]">
      {filteredCollections.map((collection, idx) => (
        <Collection
          key={idx}
          value={
            // If the collection name has been updated, use the updated one. Otherwise use the original collection name
            collection.name === updatedName.prev ? updatedName.updated : collection.name
          }
          data={collection}
          favorites={favorites}
          onChange={onChange}
          onBlur={onBlur}
          onToggleVisibility={onToggleVisibility}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
