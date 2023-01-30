import { useCallback } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { useSetAtom } from "jotai"
import { FolderPlus, X } from "phosphor-react"

import { Button } from "./Button"
import { modalOpenAtom, selectedTypefaceSlugAtom } from "~popup/atoms"

import type { ICollection, ITypeface, TypefaceTuple } from "types/typeface"
import type { SupportedWebsite } from "~types/website"

interface IFavorite {
  favorite: ITypeface
}

export const Favorite = ({ favorite }: IFavorite) => {
  const [favorites, setFavorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const setIsModalOpen = useSetAtom(modalOpenAtom)
  const setSelectedTypeface = useSetAtom(selectedTypefaceSlugAtom)
  const [, setCollections] = useStorage<ICollection[]>("collections", [])
  const [, setVisibleOrigins] = useStorage<SupportedWebsite[]>("visibleOriginWebsites", [])

  const { origin, family, /** styles, variableAxes **/ slug } = favorite

  // const stylesText = `${styles.length} style${styles.length > 1 ? "s" : ""}`
  // const variableAxesText = variableAxes > 0 ? `(variable - ${variableAxes} axes)` : ""

  const openModal = useCallback(() => {
    setIsModalOpen("collection-assignment")
    setSelectedTypeface(favorite.slug)
  }, [favorite])

  const handleRemoveTypeface = useCallback(() => {
    const favoritesMap = new Map(favorites)
    favoritesMap.delete(slug)
    setFavorites(Array.from(favoritesMap))
    setCollections((prev) =>
      prev.map((collection) => {
        if (!collection.typefaces.includes(favorite.slug)) return collection
        return {
          ...collection,
          typefaces: collection.typefaces.filter((font) => font !== favorite.slug)
        }
      })
    )
    setVisibleOrigins((prev) => {
      const remainingFontsWithSameOrigin = favorites.filter(
        (fav) => fav[1].slug !== slug && fav[1].origin.name === origin.name
      )
      if (remainingFontsWithSameOrigin.length === 0) {
        return prev.filter((prevOrigin) => prevOrigin !== origin.name)
      }
    })

    // Send message to the content_script that a font has been removed from wishlist.
    // The content_script uses this message to change the state of the add/remove wishlist button.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "removed-font",
        font: slug
      })
    })
  }, [favorites, slug])

  return (
    <div className="group flex items-center justify-between border-b border-greyscale-200 px-4 py-3 ">
      <div>
        <a
          href={origin.url}
          target="_blank"
          className="mb-[2px] block text-lg font-medium no-underline [line-height:1.2] hover:cursor-ne-resize hover:underline">
          {family}
        </a>
        {/* <p className="text-sm text-greyscale-600 opacity-90">
          {stylesText} {variableAxesText}
        </p> */}
        <p className="text-sm text-greyscale-600 opacity-90">{origin.name}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <Button intent="primary" onClick={openModal}>
          <FolderPlus size={20} color="black" />
        </Button>
        <Button intent="danger" onClick={handleRemoveTypeface}>
          <X size={16} weight="bold" color="white" />
        </Button>
      </div>
    </div>
  )
}
