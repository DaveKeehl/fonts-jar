import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { Minus, Plus } from "phosphor-react"
import { useStorage } from "@plasmohq/storage/hook"

import type { ICollection, TypefaceTuple } from "~types/typeface"
import type { SupportedWebsite } from "~types/website"
import { extractFontData } from "./logic/DOM"
import { identifyWebsite } from "./logic/detection"
import { buttonContent, websites } from "./logic/constants"

import cssText from "data-text:~style.css"
import { useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://fonts.adobe.com/fonts/*"],
  run_at: "document_end"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("h2.spectrum-Heading--display")

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const AdobeFontsButton = () => {
  const [toggled, setToggled] = useState(false)
  const [favorites, setFavorites] = useStorage<TypefaceTuple[]>("favorites", [])
  const [collections, setCollections] = useStorage<ICollection[]>("collections", [])
  const [visibleOrigins, setVisibleOrigins] = useStorage<string[]>("visibleOriginWebsites", [])

  console.log(`rendering at: ${document.location.href}`)

  const ICON = {
    SIZE: 16,
    WEIGHT: "bold"
  } as const

  const styles: { bg: string; text: string; border: string } = {
    bg: toggled
      ? "bg-[#e1e1e1]/[.25] hover:bg-[#e1e1e1]/[.15]"
      : "bg-none hover:bg-[#e1e1e1]/[.22]",
    text: "text-[#707070]",
    border: "border-[#e1e1e1]"
  }

  const bg = styles.bg
  const text = styles.text
  const border = styles.border

  return (
    <button
      className={`-mr-8 flex items-center justify-center gap-[4px] rounded-[36px] border py-2 px-[15px] font-inherit text-sm font-medium hover:cursor-pointer ${bg} ${text} ${border}`}
      onClick={() => setToggled((prev) => !prev)}>
      {!toggled ? (
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
