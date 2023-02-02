import type { ITypeface, ITypefaceOrigin } from "types/typeface"
import { websites } from "./constants"
import { isUrlLegal, slugify } from "./utils"

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
 * Given a TypefaceOrigin object, this function returns a Typeface object containing the required metadata of the typeface extracted for the currently visited page.
 * @param origin - The object containing the typeface origin metadata to know how to extract the typeface metadata.
 * @returns An object of type Typeface containing the typeface metadata.
 */
export const extractFontData = (origin: ITypefaceOrigin, titleQuery: string): ITypeface => {
  const title = document.querySelector<HTMLHeadingElement>(titleQuery).textContent

  return {
    family: title.trim(),
    slug: slugify(title),
    origin,
    added_at: ""
  }
}
