import { useStorage } from "@plasmohq/storage/hook"
import { useAtom, useAtomValue } from "jotai"
import {
  isCollectionAssignmentOpenAtom,
  selectedTypefaceAtom
} from "~popup/atoms"
import type { ICollection } from "~types/typeface"
import { Search } from "../Search"
import { Modal } from "./Modal"

export const CollectionAssignmentModal = () => {
  const [isCollectionAssignmentOpen, setIsCollectionAssignmentOpen] = useAtom(
    isCollectionAssignmentOpenAtom
  )
  const selectedTypeface = useAtomValue(selectedTypefaceAtom)
  const [collections, setCollections] = useStorage<ICollection[]>(
    "collections",
    []
  )

  return (
    <Modal
      isModalOpen={isCollectionAssignmentOpen}
      closeModal={() => setIsCollectionAssignmentOpen(false)}
      contentLabel="Collection Assignment Modal">
      {/* <Search /> */}
      <div>
        {collections.map(({ name }) => (
          <p key={crypto.randomUUID()}>{name}</p>
        ))}
      </div>
    </Modal>
  )
}
