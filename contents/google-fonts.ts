import type { PlasmoCSConfig } from "plasmo"

import { identifyTheme, identifyWebsite, getThemeToggleButton } from "./logic/detection"
import { onReady, injectMarkup, extractFontData } from "./logic/DOM"
import { injectStyles } from "./logic/styles"
import { websites } from "./logic/constants"

// export const config: PlasmoCSConfig = {
//   matches: ["https://fonts.google.com/*"],
//   run_at: "document_end"
// }

// onReady(async () => {
//   // const favorites = await storage.get("favorites")
//   // console.log(favorites);

//   const typefaceOrigin = identifyWebsite(document.location.href)
//   const website = websites.find((el) => el.name === typefaceOrigin.name)

//   if (website === undefined) throw new Error("Unsupported website")

//   const theme = identifyTheme(website.name)
//   const themeToggleButton = getThemeToggleButton(website.queries.theme.toggle)
//   const typeface = extractFontData(typefaceOrigin, website.queries)

//   injectStyles(typeface.origin.name, theme)
//   injectMarkup(typeface, themeToggleButton)
// })
