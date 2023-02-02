import type { Website } from "types/website"

/**
 * The content of the button (used to add/remove fonts) that is injected in the page.
 */
export const buttonContent = {
  add: "Add to favorites",
  remove: "Remove from favorites"
}

/**
 * For each supported website, a list of all the data needed to run the content_script
 */
export const websites: Website[] = [
  {
    name: "Google Fonts",
    regex: {
      match: /fonts.google.com\/?(.*)\/specimen\/.*/,
      ignore: /fonts.google.com\/?(.*)\/specimen\/.*\?.*preview.text=/
    },
    queries: {
      theme: {
        element: "body", // Which element holds the dark theme class name
        darkThemeClass: "gf-dark-theme",
        toggle: "button.theme-toggle"
      },
      titleElement: "gf-specimen-header h1"
    }
  },
  {
    name: "Adobe Fonts",
    regex: {
      match: /fonts.adobe.com\/fonts\/.*/
    },
    queries: {
      titleElement: "h2.spectrum-Heading--display"
    }
  }
]
