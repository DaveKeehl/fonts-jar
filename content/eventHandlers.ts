import type { ICollection, ITypeface, TypefaceTuple } from "types/typeface"
import { storage } from "./storage"
import { toggleButtonState } from "./DOM"

/**
 * Function that gets fired whenever the injected button is clicked.
 * @param buttons - The injected <button> elements.
 * @param typeface - The typeface metadata used to either remove or add the typeface to the wishlist.
 */
export const handleButtonClick = async (
  buttons: NodeListOf<HTMLButtonElement>,
  typeface: ITypeface
) => {
  const favorites = new Map((await storage.get("favorites")) as TypefaceTuple[])
  let collections = (await storage.get("collections")) as ICollection[]
  const fontInFavorites = favorites.has(typeface.slug)

  buttons.forEach((button) => {
    toggleButtonState(button, !fontInFavorites, async () => {
      if (fontInFavorites) {
        favorites.delete(typeface.slug)
        collections = collections.map((collection) => {
          if (!collection.typefaces.includes(typeface.slug)) return collection
          return {
            ...collection,
            typefaces: collection.typefaces.filter(
              (slug) => slug !== typeface.slug
            )
          }
        })
        return
      }

      const now = new Date()
      typeface["added_at"] = now.toString()
      favorites.set(typeface.slug, typeface)
    })
  })

  storage.set("favorites", Array.from(favorites))
  storage.set("collections", collections)
}
