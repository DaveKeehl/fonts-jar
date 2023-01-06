import type { CompareFunction, ISorting } from "~types/sorting"
import type { TypefaceTuple } from "~types/typeface"

const sortAscendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
  if (a[1].slug < b[1].slug) return -1
  if (a[1].slug > b[1].slug) return 1
  return 0
}

const sortDescendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
  if (a[1].slug > b[1].slug) return -1
  if (a[1].slug < b[1].slug) return 1
  return 0
}

const sortAscendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
  const aDate = new Date(a[1].added_at)
  const bDate = new Date(b[1].added_at)

  if (+aDate < +bDate) return -1
  if (+aDate > +bDate) return 1
  return 0
}

const sortDescendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
  const aDate = new Date(a[1].added_at)
  const bDate = new Date(b[1].added_at)

  if (+aDate > +bDate) return -1
  if (+aDate < +bDate) return 1
  return 0
}

export const getSortFunction = (sort: ISorting) => {
  const { method, direction } = sort
  let sortFunction: CompareFunction | string = ""

  if (method === "alphabetical" && direction === "ascending") sortFunction = sortAscendingBySlug
  if (method === "alphabetical" && direction === "descending") sortFunction = sortDescendingBySlug
  if (method === "time" && direction === "ascending") sortFunction = sortAscendingByDate
  if (method === "time" && direction === "descending") sortFunction = sortDescendingByDate

  return sortFunction as CompareFunction
}
