import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { Minus, Plus } from "phosphor-react"
import { cva } from "cva"
import { twMerge } from "tailwind-merge"

import type { ICollection, ITypeface, TypefaceTuple } from "~types/typeface"
import type { Theme, Website } from "~types/website"
import { isUrlLegal, slugify } from "~contents/utils"

interface IButton {
  website: Website
  defaultTheme: Theme
  className?: string
  variants?: {
    theme: {
      dark: string[]
      light: string[]
    }
    filledDark: {
      true: string[]
      false: string[]
    }
    filledLight: {
      true: string[]
      false: string[]
    }
  }
}

const Button = ({
  website,
  className,
  defaultTheme,
  variants = {
    theme: {
      dark: [],
      light: []
    },
    filledDark: {
      true: [],
      false: []
    },
    filledLight: {
      true: [],
      false: []
    }
  }
}: IButton) => {
  const [typeface, setTypeface] = useState<ITypeface>()
  const [favorites, setFavorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    setTimeout(() => {
      const url = document.location.href

      if (!isUrlLegal(url, website.regex)) {
        throw new Error(`The received url (${url}) does not seem to be supported`)
      }

      if (website.queries.theme) {
        const { element, darkThemeClass, toggle } = website.queries.theme

        // Grab the current theme
        const themeHolder = document.querySelector(element)
        const initialTheme: Theme = themeHolder.classList.contains(darkThemeClass)
          ? "dark"
          : "light"
        setTheme(initialTheme)

        // Attach event listener to theme toggler to know when to change theme
        const themeTogglers = document.querySelectorAll(toggle)
        themeTogglers.forEach((toggler) => toggler.addEventListener("click", toggleTheme))
      }

      const fontName = document
        .querySelector<HTMLHeadingElement>(website.queries.titleElement)
        .textContent.trim()

      setTypeface({
        family: fontName,
        slug: slugify(fontName),
        origin: {
          name: website.name,
          url
        },
        added_at: ""
      })
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

  const button = cva(
    twMerge(
      "flex items-center justify-center gap-[4px] rounded-[36px] border py-[7px] px-[15px] font-inherit text-sm font-medium hover:cursor-pointer",
      className
    ),
    {
      variants,
      defaultVariants: {
        theme
      }
    }
  )

  return (
    <button className={button(buttonProps)} onClick={handleClick}>
      {!isFontInFavorites ? (
        <>
          <Plus size={ICON.SIZE} weight={ICON.WEIGHT} />
          <span>Add to favorites</span>
        </>
      ) : (
        <>
          <Minus size={ICON.SIZE} weight={ICON.WEIGHT} />
          <span>Remove from favorites</span>
        </>
      )}
    </button>
  )
}

export default Button
