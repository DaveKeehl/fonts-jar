import { useEffect, useState } from "react"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useStorage } from "@plasmohq/storage/hook"
import { Minus, Plus } from "phosphor-react"
import { cva } from "cva"

import type {
  ICollection,
  ITypeface,
  ITypefaceV2,
  TypefaceTuple,
  TypefaceTupleV2
} from "~types/typeface"
import type { Theme } from "~types/website"
import { extractFontData, extractFontDataV2 } from "./logic/DOM"
import { identifyWebsite } from "./logic/detection"
import { buttonContent, websites, websites2 } from "./logic/constants"
import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://fonts.adobe.com/fonts/*"],
  run_at: "document_end"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  return document.querySelector("h2.spectrum-Heading--display")
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline"

const button = cva(
  "flex items-center justify-center gap-[4px] rounded-[36px] border py-[7px] px-[15px] font-inherit text-sm font-medium hover:cursor-pointer",
  {
    variants: {
      theme: {
        dark: [],
        light: ["border-adobe-light-primary", "text-adobe-light-primary"]
      },
      filledDark: {
        true: [],
        false: []
      },
      filledLight: {
        true: ["bg-adobe-light-primary/[.25]"],
        false: ["bg-none hover:bg-adobe-light-primary/[.10]"]
      }
    },
    defaultVariants: {
      theme: "dark"
    }
  }
)

const AdobeFontsButton = () => {
  const [typeface, setTypeface] = useState<ITypefaceV2>()
  const [favorites, setFavorites] = useStorage<TypefaceTupleV2[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])
  const [theme, setTheme] = useState<Theme>("light") // diff

  useEffect(() => {
    setTimeout(() => {
      console.log({ websites2 })
      const typefaceOrigin = identifyWebsite(document.location.href)
      const website = websites2.find((el) => el.name === typefaceOrigin.name)
      // console.log({ typefaceOrigin, website })

      if (website.queries.theme) {
        const { element, darkThemeClass, toggle } = website.queries.theme

        const themeHolder = document.querySelector(element)
        const initialTheme: Theme = themeHolder.classList.contains(darkThemeClass)
          ? "dark"
          : "light"
        setTheme(initialTheme)
        const themeToggler = document.querySelector(toggle)
        themeToggler.addEventListener("click", toggleTheme)
      }

      setTypeface(extractFontDataV2(typefaceOrigin, website.queries.titleElement))
    }, 100)
  }, [])

  const isFontInFavorites = typeface ? new Map(favorites).has(typeface.slug) : false

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

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

  const ICON = {
    SIZE: 16,
    WEIGHT: "bold"
  } as const

  const buttonProps =
    theme === "dark"
      ? {
          theme,
          filledDark: isFontInFavorites
        }
      : {
          theme,
          filledLight: isFontInFavorites
        }

  return (
    <button className={button(buttonProps)} onClick={handleClick}>
      {!isFontInFavorites ? (
        <>
          <Plus size={ICON.SIZE} weight={ICON.WEIGHT} />
          <span>{buttonContent.add}</span>
        </>
      ) : (
        <>
          <Minus size={ICON.SIZE} weight={ICON.WEIGHT} />
          <span>{buttonContent.remove}</span>
        </>
      )}
    </button>
  )
}

export default AdobeFontsButton
