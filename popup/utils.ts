import { isPlainObject } from "lodash"

import type { CompareFunction, ISorting } from "~types/sorting"
import type { TypefaceTuple } from "~types/typeface"

/**
 * Compare function that allows to sort typefaces by slug in ascending order.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Whether the first slug either came first, last or was the same as the other one.
 */
const sortAscendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
  if (a[1].slug < b[1].slug) return -1
  if (a[1].slug > b[1].slug) return 1
  return 0
}

/**
 * Compare function that allows to sort typefaces by slug in descending order.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Whether the first slug either came first, last or was the same as the other one.
 */
const sortDescendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
  if (a[1].slug > b[1].slug) return -1
  if (a[1].slug < b[1].slug) return 1
  return 0
}

/**
 * Compare function that allows to sort typefaces by date in ascending order.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Whether the first date either came first, last or was the same as the other one.
 */
const sortAscendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
  const aDate = new Date(a[1].added_at)
  const bDate = new Date(b[1].added_at)

  if (+aDate < +bDate) return -1
  if (+aDate > +bDate) return 1
  return 0
}

/**
 * Compare function that allows to sort typefaces by date in descending order.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Whether the first date either came first, last or was the same as the other one.
 */
const sortDescendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
  const aDate = new Date(a[1].added_at)
  const bDate = new Date(b[1].added_at)

  if (+aDate > +bDate) return -1
  if (+aDate < +bDate) return 1
  return 0
}

/**
 * Given some sorting information (method and direction), return the appropriate compare function to be used.
 * @param sort - The sorting information (method and direction).
 * @returns The appropriate compare function.
 */
export const getSortFunction = (sort: ISorting) => {
  const { method, direction } = sort
  let sortFunction: CompareFunction | string = ""

  if (method === "alphabetical" && direction === "ascending") sortFunction = sortAscendingBySlug
  if (method === "alphabetical" && direction === "descending") sortFunction = sortDescendingBySlug
  if (method === "time" && direction === "ascending") sortFunction = sortAscendingByDate
  if (method === "time" && direction === "descending") sortFunction = sortDescendingByDate

  return sortFunction as CompareFunction
}

export const useSearch = <T, S = T>(
  query: string,
  items: T[],
  validate: (
    cleanQuery: string,
    normalize: (input: string) => string
  ) => {
    [property in keyof S]?: {
      propertyContainsQuery: (item: T) => boolean
      queryContainsProperty?: (item: T) => boolean
    }
  },
  mapper?: (item: T) => S
) => {
  const normalize = (input: string) => input.trim().toLowerCase()
  const validations = validate(normalize(query), normalize)

  return [...items].filter((item) => {
    const properties = isPlainObject(item) ? Object.keys(item) : Object.keys(mapper(item))

    return properties.reduce((result, property) => {
      const validationHasProperty = Object.hasOwn(validations, property)

      if (validationHasProperty) {
        const { propertyContainsQuery, queryContainsProperty } = validations[property]

        if (queryContainsProperty) {
          return result || propertyContainsQuery(item) || queryContainsProperty(item)
        }
        return result || propertyContainsQuery(item)
      }

      return result
    }, false)
  })
}
