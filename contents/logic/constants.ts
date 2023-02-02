import type { Website, WebsiteV2 } from "types/website"

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
      titleElement: ["gf-specimen-header h1"],
      variants: "span.variant__style",
      variableAxes: "div.variable-axes__preview div.axis-container"
    },
    themes: {
      dark: {
        primary: "#8ab4f8", // The button color at default state,
        secondary: "#d2e3fc", // The button text color when hovered,
        tertiary: "rgba(138, 180, 248, .04)", // The button background when hovered.
        quaternary: "rgba(138, 180, 248, .25)" // The button background when active
      },
      light: {
        primary: "#1a73e8",
        secondary: "#174ea6",
        tertiary: "rgba(26, 115, 232, .04)",
        quaternary: "rgba(26, 115, 232, .25)"
      }
    },
    styles: {
      button: {
        gap: "4px",
        background: "none",
        border: "1px solid",
        borderRadius: "36px",
        padding: "4px 15px",
        margin: "0 -2rem 0 0",
        fontSize: "14px",
        fontWeight: "500"
      },
      icon: {
        size: "20px",
        padding: "0px"
      }
    }
  }
]

export const websites2: WebsiteV2[] = [
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
