import type { PlasmoContentScript } from "plasmo"

import { identifyTheme, identifyWebsite, getThemeToggleButton } from "./content/detection"
import { onReady, injectMarkup, extractFontData } from "./content/DOM"
import { injectStyles } from "./content/styles"
import { websites } from "./content/constants"
import { storage } from "./content/storage"

export const config: PlasmoContentScript = {
  matches: ["https://fonts.google.com/*"],
  run_at: "document_end"
}

onReady(async () => {
  // const favorites = await storage.get("favorites")
  // console.log(favorites);

  const typefaceOrigin = identifyWebsite(document.location.href)
  const website = websites.find((el) => el.name === typefaceOrigin.name)

  if (website === undefined) throw new Error("Unsupported website")

  const theme = identifyTheme(website.name)
  const themeToggleButton = getThemeToggleButton(website.queries.theme.toggle)
  const typeface = extractFontData(typefaceOrigin, website.queries)

  injectStyles(typeface.origin.name, theme)
  injectMarkup(typeface, themeToggleButton)
})
