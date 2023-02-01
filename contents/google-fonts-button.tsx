import { useEffect, useState } from "react"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useStorage } from "@plasmohq/storage/hook"
import { Minus, Plus } from "phosphor-react"
import { cva } from "cva"

import type { ICollection, ITypeface, TypefaceTuple } from "~types/typeface"
import type { Theme } from "~types/website"
import { extractFontData } from "./logic/DOM"
import { identifyWebsite } from "./logic/detection"
import { buttonContent, websites } from "./logic/constants"
import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://fonts.google.com/*specimen/*"],
  run_at: "document_end"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  return document.querySelector("ul.breadcrumb__actions li:nth-last-child(2)")
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline"

const button = cva(
  "-mr-8 flex items-center justify-center gap-[4px] rounded-[36px] border py-2 px-[15px] font-inherit text-sm font-medium hover:cursor-pointer",
  {
    variants: {
      theme: {
        dark: ["border-gf-dark-primary", "text-gf-dark-primary", "hover:text-gf-dark-secondary"],
        light: ["border-gf-light-primary", "text-gf-light-primary", "hover:text-gf-light-secondary"]
      },
      filledDark: {
        true: ["bg-gf-dark-primary/[.25]"],
        false: ["bg-none hover:bg-gf-dark-primary/[.04]"]
      },
      filledLight: {
        true: ["bg-gf-light-primary/[.25]"],
        false: ["bg-none hover:bg-gf-light-primary/[.04]"]
      }
    },
    defaultVariants: {
      theme: "dark"
    }
  }
)

const Button = () => {
  const [typeface, setTypeface] = useState<ITypeface>()
  const [favorites, setFavorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    setTimeout(() => {
      const typefaceOrigin = identifyWebsite(document.location.href)
      const website = websites.find((el) => el.name === typefaceOrigin.name)
      const themeHolder = document.querySelector(website.queries.theme.element)
      const initialTheme: Theme = themeHolder.classList.contains(
        website.queries.theme.darkThemeClass
      )
        ? "dark"
        : "light"
      setTheme(initialTheme)
      const themeToggler = document.querySelector(website.queries.theme.toggle)
      themeToggler.addEventListener("click", toggleTheme)
      setTypeface(extractFontData(typefaceOrigin, website.queries))
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
    SIZE: 20,
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

export default Button
