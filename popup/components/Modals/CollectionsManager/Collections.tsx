import { CollectionItem } from "~/popup/components/Modals/CollectionsManager/Collection";

import type { Collection, TypefaceTuple } from "~/types/typeface";

interface Props {
  collections: Collection[];
  filteredCollections: Collection[];
  updatedName: { prev: string; updated: string };
  favorites: TypefaceTuple[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onBlur: (name: string) => void;
  onToggleVisibility: (name: string) => void;
  onDelete: (name: string) => void;
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
}: Props) => {
  if (filteredCollections.length === 0) {
    const message = collections.length === 0 ? "No collections." : "No results.";
    return <p className="text-base">{message}</p>;
  }

  return (
    <div className="flex flex-col gap-[3px]">
      {filteredCollections.map((collection) => (
        <CollectionItem
          key={collection.name}
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
  );
};
