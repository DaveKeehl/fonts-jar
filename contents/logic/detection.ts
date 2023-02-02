import type { SupportedWebsite, Theme } from "types/website"
import type { ITypefaceOrigin } from "types/typeface"
import { websites, websites2 } from "./constants"
import { isUrlLegal } from "./utils"

/**
 * Given a url, this function checks whether the website is either supported or not.
 * @param url - The url to be checked.
 * @returns If the url is supported, an object of type TypefaceOrigin is returned. Otherwise an error is thrown.
 */
export const identifyWebsite = (url: string): ITypefaceOrigin | never => {
  const origin = websites2.find((website) => isUrlLegal(url, website.regex))

  if (origin === undefined) {
    throw new Error(`The received url (${url}) does not seem to be supported`)
  }

  return {
    name: origin.name,
    url
  }
}

/**
 * Given some DOM information, detect whether dark mode or light is being used.
 * @param website - The website to extract the theme from.
 * @returns The theme name.
 */
export const identifyTheme = (website: SupportedWebsite): Theme => {
  const origin = websites.filter((el) => el.name === website)[0]
  const themeQuery = origin.queries.theme
  const element = document.querySelector(themeQuery.element)
  return element.classList.contains(themeQuery.darkThemeClass) ? "dark" : "light"
}

/**
 * Function that given a query string, it returns an element representing the theme toggle button.
 * @param query - The query to be used.
 * @returns The theme toggle button
 */
export const getThemeToggleButton = (query: string) => {
  const button = document.querySelector<HTMLButtonElement>(query)

  if (!button) throw new Error("No theme toggle button")

  return button
}
