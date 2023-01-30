import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { Minus, Plus } from "phosphor-react"
import { useStorage } from "@plasmohq/storage/hook"

import type { ICollection, TypefaceTuple } from "~types/typeface"
import { extractFontData } from "./logic/DOM"
import { identifyWebsite } from "./logic/detection"
import { buttonContent, websites } from "./logic/constants"

import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://fonts.google.com/*"],
  run_at: "document_end"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("#main-content h1.gmat-headline-1:first-of-type")

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const Button = () => {
  const [favorites, setFavorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])

  const typefaceOrigin = identifyWebsite(document.location.href)
  const website = websites.find((el) => el.name === typefaceOrigin.name)
  const typeface = extractFontData(typefaceOrigin, website.queries)

  const isFontInFavorites = new Map(favorites).has(typeface.slug)

  const icon = {
    size: 20,
    weight: "bold"
  } as const

  const bg = isFontInFavorites ? "bg-gf-primary/[.25]" : "bg-none hover:bg-gf-primary/[.04]"

  const handleClick = () => {
    const newFavorites = new Map(favorites)
    let newCollections = [...collections]
    let newVisibleOrigins = [...visibleOrigins]

    if (isFontInFavorites) {
      newFavorites.delete(typeface.slug)

      const remainingFontsWithSameOrigin = Array.from(newFavorites).filter(([, fav]) => {
        return fav.slug !== typeface.slug && fav.origin.name === typeface.origin.name
      })

      if (remainingFontsWithSameOrigin.length === 0) {
        newVisibleOrigins = newVisibleOrigins.filter(
          (prevOrigin) => prevOrigin !== typeface.origin.name
        )
      }

      newCollections = newCollections.map((collection) => {
        if (!collection.typefaces.includes(typeface.slug)) return collection
        return {
          ...collection,
          typefaces: collection.typefaces.filter((slug) => slug !== typeface.slug)
        }
      })
    } else {
      newFavorites.set(typeface.slug, { ...typeface, added_at: new Date().toString() })

      const uniqueOrigins = [...newFavorites].map(([, favorite]) => favorite.origin.name)
      uniqueOrigins.forEach((origin) => {
        if (!newVisibleOrigins.includes(origin)) {
          newVisibleOrigins = [...newVisibleOrigins, origin]
        }
      })
    }

    setFavorites(Array.from(newFavorites))
    setCollections(newCollections)
    setVisibleOrigins(newVisibleOrigins)
  }

  return (
    <button
      className={`-mr-8 flex items-center justify-center gap-[4px] rounded-[36px] border border-[#8ab4f8] py-2 px-[15px] font-inherit text-sm font-medium text-[#8ab4f8] hover:cursor-pointer hover:text-[#d2e3fc] ${bg}`}
      onClick={handleClick}>
      {!isFontInFavorites ? (
        <>
          <Plus size={icon.size} weight={icon.weight} />
          <span>{buttonContent.add}</span>
        </>
      ) : (
        <>
          <Minus size={icon.size} weight={icon.weight} />
          <span>{buttonContent.remove}</span>
        </>
      )}
    </button>
  )
}

export default Button
