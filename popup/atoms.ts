import { atom } from "jotai"

type Modal = "collections-manager" | "collection-assignment"
export const modalOpenAtom = atom<"" | Modal>("")

export const selectedTypefaceSlugAtom = atom("")
