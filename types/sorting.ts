import type { TypefaceTuple } from "~/types/typeface"

export interface Sorting {
  method: "alphabetical" | "time"
  direction: "ascending" | "descending"
}

export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0
