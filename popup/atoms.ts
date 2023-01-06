import { atom } from "jotai"
import type { ISorting } from "~types/sorting"

export const searchQueryAtom = atom("")
export const sortMethodAtom = atom<ISorting["method"]>("alphabetical")
export const sortDirectionAtom = atom<ISorting["direction"]>("ascending")
