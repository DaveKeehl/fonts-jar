import type { ITypeface, TypefaceTuple } from "types/typeface"
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
  const fontInFavorites = favorites.has(typeface.slug)

  buttons.forEach((button) => {
    toggleButtonState(button, !fontInFavorites, () => {
      if (fontInFavorites) {
        favorites.delete(typeface.slug)
        return
      }

      const now = new Date()
      typeface["added_at"] = now.toString()
      favorites.set(typeface.slug, typeface)
    })
  })

  storage.set("favorites", Array.from(favorites))
}
