import { atom } from "jotai"

type Modal = "collections-manager" | "collection-assignment" | "origin-websites"
export const modalOpenAtom = atom<"" | Modal>("")

export const selectedTypefaceSlugAtom = atom("")
