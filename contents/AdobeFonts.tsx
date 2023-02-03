import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import Button from "./components/Button"

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

export default function AdobeFontsButton() {
  return (
    <Button
      website={{
        name: "Adobe Fonts",
        regex: {
          match: /fonts.adobe.com\/fonts\/.*/
        },
        queries: {
          titleElement: "h2.spectrum-Heading--display"
        }
      }}
      defaultTheme="light"
      variants={{
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
      }}
    />
  )
}
