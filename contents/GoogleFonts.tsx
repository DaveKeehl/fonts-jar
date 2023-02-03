import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import Button from "./components/Button"

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

export default function GoogleFontsButton() {
  return (
    <Button
      website={{
        name: "Google Fonts",
        regex: {
          match: /fonts.google.com\/?(.*)\/specimen\/.*/,
          ignore: /fonts.google.com\/?(.*)\/specimen\/.*\?.*preview.text=/
        },
        queries: {
          theme: {
            element: "body",
            darkThemeClass: "gf-dark-theme",
            toggle: "button.theme-toggle"
          },
          titleElement: "gf-specimen-header h1"
        }
      }}
      defaultTheme="dark"
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
