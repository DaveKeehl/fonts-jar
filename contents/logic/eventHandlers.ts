import type { ICollection, ITypeface, TypefaceTuple } from "types/typeface"
import { storage } from "./storage"
import { toggleButtonState } from "./DOM"
import type { SupportedWebsite } from "~types/website"

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
  let visibleOrigins = (await storage.get("visibleOriginWebsites")) as SupportedWebsite[]
  const fontInFavorites = favorites.has(typeface.slug)

  buttons.forEach((button) => {
    toggleButtonState(button, !fontInFavorites, async () => {
      if (fontInFavorites) {
        favorites.delete(typeface.slug)
        const remainingFontsWithSameOrigin = Array.from(favorites).filter(
          ([, fav]) => fav[1].slug !== typeface.slug && fav[1].origin.name === typeface.origin.name
        )
        if (remainingFontsWithSameOrigin.length === 0) {
          visibleOrigins = visibleOrigins.filter(
            (prevOrigin) => prevOrigin !== typeface.origin.name
          )
        }

        collections = collections.map((collection) => {
          if (!collection.typefaces.includes(typeface.slug)) return collection
          return {
            ...collection,
            typefaces: collection.typefaces.filter((slug) => slug !== typeface.slug)
          }
        })
        return
      }

      const now = new Date()
      typeface["added_at"] = now.toString()
      favorites.set(typeface.slug, typeface)

      const uniqueOrigins = [...favorites].map(([, favorite]) => favorite.origin.name)
      uniqueOrigins.forEach((origin) => {
        if (!visibleOrigins.includes(origin)) {
          visibleOrigins = [...visibleOrigins, origin]
        }
      })
    })
  })

  storage.set("favorites", Array.from(favorites))
  storage.set("collections", collections)
  storage.set("visibleOriginWebsites", visibleOrigins)
}
