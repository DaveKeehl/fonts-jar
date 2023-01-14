import { getFavorites } from "./storage"
import type { ExtractionQueries, SupportedWebsite } from "types/website"
import type { ITypeface, ITypefaceOrigin } from "types/typeface"
import { buttonContent, websites } from "./constants"
import { identifyTheme } from "./detection"
import { handleButtonClick } from "./eventHandlers"
import { injectStyles } from "./styles"
import { isUrlLegal, slugify, useFirstValidCandidate } from "./utils"

/**
 * Function that fires when the DOM is ready to run the content_script code.
 * @param fn - The function to be run when the DOM is ready.
 */
export const onReady = (fn: () => unknown, timeout = 300) => {
  let previousUrl = ""
  const urls = websites.map((website) => website.regex)

  const observer = new MutationObserver(() => {
    const hasUrlChanged = location.href !== previousUrl
    const hasLegalUrls = urls.some((url) => isUrlLegal(location.href, url))

    if (hasUrlChanged && hasLegalUrls) {
      previousUrl = location.href
      // console.log(`URL changed to ${location.href}`);

      const stateCheck = setInterval(() => {
        if (document.readyState === "complete") {
          clearInterval(stateCheck)
          // document ready
          setTimeout(fn, timeout)
          // fn();
        }
      }, 100)

      // if (document.readyState != 'loading') {
      // } else {
      // 	document.addEventListener('DOMContentLoaded', fn);
      // }
    }
  })

  const config = {
    subtree: true,
    childList: true
  }
  observer.observe(document, config)
}

/**
 * Function that extracts the font name from a page given a list of selector queries.
 * @param queries - The list of selector queries. The function uses the first query that results in a non-null element.
 * @returns The font name.
 */
const extractFontName = (queries: string[]) => {
  const fontName = useFirstValidCandidate(
    queries,
    (query) => document.querySelector<HTMLHeadingElement>(query),
    (element) => element.textContent,
    (candidate) => !!candidate
  )

  if (!fontName) throw new Error("Couldn't extract the font name")

  return fontName
}

/**
 * Given a TypefaceOrigin object, this function returns a Typeface object containing the required metadata of the typeface extracted for the currently visited page.
 * @param origin - The object containing the typeface origin metadata to know how to extract the typeface metadata.
 * @returns An object of type Typeface containing the typeface metadata.
 */
export const extractFontData = (
  origin: ITypefaceOrigin,
  queries: ExtractionQueries
): ITypeface => {
  const title = extractFontName(queries.titleElement)
  const variants = document.querySelectorAll<HTMLSpanElement>(queries.variants)
  const variableAxes = document.querySelectorAll<HTMLDivElement>(
    queries.variableAxes
  )

  return {
    family: title.trim(),
    slug: slugify(title),
    styles: [...variants]
      .map((variant) =>
        variant.textContent !== null ? variant.textContent.trim() : ""
      )
      .filter((variant) => variant !== ""),
    variableAxes: variableAxes !== undefined ? variableAxes.length : 0,
    origin,
    added_at: ""
  }
}

/**
 * Function that creates the button element to be placed on the screen.
 * @returns The created <button> element.
 */
const createButton = (): HTMLButtonElement => {
  const button = document.createElement("button")
  button.innerHTML = /* html */ `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
			<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.add}</span>
	`
  button.classList.add("addToFavorites")
  return button
}

const placeButtonsOnGoogleFonts = () => {
  const downloadButtons = useFirstValidCandidate(
    ["a.breadcrumb__action--download"],
    (candidate) => document.querySelectorAll<HTMLElement>(candidate),
    (candidate) => candidate,
    (candidate) => candidate.length > 0
  )

  if (!downloadButtons) throw new Error("No download buttons")

  downloadButtons.forEach((downloadButton) => {
    const parent = downloadButton.parentElement

    if (parent) {
      const button = createButton()

      parent.style.display = "flex"
      button.style.marginRight = "1rem"
      parent.innerHTML = ""
      parent.appendChild(button.cloneNode(true))
      parent.appendChild(downloadButton)
    }
  })
}

/**
 * Function in charge of placing the button(s) on the screen.
 * @param website - The website the user is on.
 * @returns All the buttons placed on the page.
 */
const placeButtonOnScreen = (website: SupportedWebsite) => {
  if (website === "Google Fonts") placeButtonsOnGoogleFonts()

  return document.querySelectorAll<HTMLButtonElement>("button.addToFavorites")
}

/**
 * Function that toggles the state of the created <button> element.
 * @param button - The <button> element to be updated.
 * @param fontInFavorites - Whether the typeface represented by the currently visited page is in the favorites.
 * @param fn - An optional callback function to be run everytime this function is fired.
 */
export const toggleButtonState = (
  button: HTMLButtonElement,
  fontInFavorites: boolean,
  fn: () => unknown = () => null
) => {
  button.classList.toggle("active", fontInFavorites)
  button.innerHTML = fontInFavorites
    ? /* html */ `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.remove}</span>
	`
    : /* html */ `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
			<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.add}</span>
	`
  fn()
}

/**
 * Given a Typeface object, inject in the DOM the needed markup.
 * @param typeface - The typeface metadata needed to create the markup.
 * @param themeToggleButton - The theme toggle <button> element used to switch theme.
 */
export const injectMarkup = async (
  typeface: ITypeface,
  themeToggleButton: HTMLButtonElement
) => {
  const website = typeface.origin.name

  // If there is a theme toggle button, attach an event listener to update the styles
  if (themeToggleButton !== undefined) {
    themeToggleButton.addEventListener("click", () => {
      injectStyles(website, identifyTheme(website))
    })
  }

  const buttons = placeButtonOnScreen(typeface.origin.name)

  // Fix button style when placed in collapsed header
  if (website === "Google Fonts") {
    document.addEventListener("scroll", () => {
      buttons.forEach((button) =>
        button.classList.toggle("collapsed-header", window.scrollY > 130)
      )
    })
  }

  const favoritesAtStart = await getFavorites()

  buttons.forEach((button) => {
    toggleButtonState(button, favoritesAtStart.has(typeface.slug))
    button.addEventListener("click", () => handleButtonClick(buttons, typeface))
  })

  // Handle any incoming messages from other parts of the extension
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.message === "removed-font") {
      if (request.font === typeface.slug) {
        buttons.forEach((button) => toggleButtonState(button, false))
      }
    } else if (request.message === "changed-tab") {
      const favorites = await getFavorites()

      const isFontInFavorites = favorites.has(typeface.slug)
      const buttonIsActive = buttons[0].classList.contains("active")

      // Check if page data and extension storage are out of sync
      if (buttonIsActive !== isFontInFavorites) {
        buttons.forEach((button) =>
          toggleButtonState(button, isFontInFavorites)
        )
      }
    }
  })
}
