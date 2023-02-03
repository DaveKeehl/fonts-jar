import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import Button from "./components/Button"

import cssText from "data-text:~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.fontshare.com/fonts/*"],
  run_at: "document_end"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  return document.querySelector("h1")
}

// Use this to optimize unmount lookups
export const getShadowHostId = () => "plasmo-inline"

export default function FontshareButton() {
  return (
    <Button
      website={{
        name: "Fontshare",
        regex: {
          match: /.*fontshare.com\/fonts\/.*/
        },
        queries: {
          theme: {
            element: "html",
            darkThemeClass: "dark",
            toggle: "div > svg[width='16'][height='16']"
          },
          titleElement: "h1"
        }
      }}
      defaultTheme="dark"
      className="text-2xl"
      variants={{
        theme: {
          dark: ["border-gf-dark-primary", "text-gf-dark-primary", "hover:text-gf-dark-secondary"],
          light: [
            "border-gf-light-primary",
            "text-gf-light-primary",
            "hover:text-gf-light-secondary"
          ]
        },
        filledDark: {
          true: ["bg-gf-dark-primary/[.25]"],
          false: ["bg-none hover:bg-gf-dark-primary/[.04]"]
        },
        filledLight: {
          true: ["bg-gf-light-primary/[.25]"],
          false: ["bg-none hover:bg-gf-light-primary/[.04]"]
        }
      }}
    />
  )
}
