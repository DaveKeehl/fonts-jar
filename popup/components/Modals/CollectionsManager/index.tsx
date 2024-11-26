import { useState } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { useAtomValue } from "jotai";

import { Collections } from "~/popup/components/Modals/CollectionsManager/Collections";
import { NewCollectionForm } from "~/popup/components/Modals/CollectionsManager/NewCollectionForm";
import { Modal } from "~/popup/components/Modals/Modal";
import { Search } from "~/popup/components/Search";

import { modalOpenAtom } from "~/utils/atoms";
import { useSearch } from "~/utils/popup";
import type { Collection, TypefaceTuple } from "~/types/typeface";

export const CollectionsManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedName, setUpdatedName] = useState<{
    prev: string;
    updated: string;
  }>({
    prev: "",
    updated: ""
  });
  const [newCollection, setNewCollection] = useState("");
  const modalOpen = useAtomValue(modalOpenAtom);
  const [favorites] = useStorage<TypefaceTuple[]>("favorites", []);
  const [collections, setCollections] = useStorage<Collection[]>("collections", []);

  const filteredCollections = useSearch(searchQuery, collections, (cleanQuery, normalize) => ({
    name: {
      propertyContainsQuery: ({ name }) => normalize(name).includes(cleanQuery),
      queryContainsProperty: ({ name }) => cleanQuery.includes(normalize(name))
    },
    typefaces: {
      propertyContainsQuery: ({ typefaces }) =>
        typefaces.some((typeface) => {
          const cleanTypeface = normalize(typeface);
          return cleanQuery.split(" ").some((term) => {
            const cleanTerm = normalize(term);
            return cleanTypeface.includes(cleanTerm);
          });
        })
    }
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCollection(e.target.value);

  const handleToggleVisibility = (name: string) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name !== name) return collection;
        return { ...collection, hidden: !collection.hidden };
      })
    );
  };

  const handleDelete = (name: string) => {
    setCollections((prev) => prev.filter((collection) => collection.name !== name));
  };

  const updateCollectionName = (oldName: string, newName: string) => {
    setCollections((prev) =>
      prev.map((collection) => {
        if (collection.name !== oldName) return collection;
        return { ...collection, name: newName };
      })
    );
  };

  const addCollection = (collection: Collection) => {
    setCollections((prev) => [...prev, collection]);
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUpdatedName({ prev: name, updated: e.target.value });
  };

  const handleUpdateNameAfterLostFocus = (name: string) => {
    updateCollectionName(name, updatedName.updated.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCollection({ name: newCollection, typefaces: [], hidden: false });
    setNewCollection("");
    e.currentTarget.blur();
  };

  return (
    <Modal
      isModalOpen={modalOpen === "collections-manager"}
      contentLabel="Collections Manager Modal"
    >
      <div className="flex flex-col gap-4 px-5 py-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Collections</h2>
          <p className="text-sm">⚠️ Deleting a collection will not delete its fonts.</p>
        </div>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputClassName="rounded-lg bg-greyscale-200/60 py-2 pr-3 pl-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-greyscale-200"
          iconClassName="left-3"
        />
        <div className="flex flex-col gap-4">
          <Collections
            collections={collections}
            filteredCollections={filteredCollections}
            favorites={favorites}
            updatedName={updatedName}
            onChange={(e, name) => handleUpdateName(e, name)}
            onBlur={(name) => handleUpdateNameAfterLostFocus(name)}
            onToggleVisibility={(name) => handleToggleVisibility(name)}
            onDelete={(name) => handleDelete(name)}
          />
          <NewCollectionForm
            value={newCollection}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};
