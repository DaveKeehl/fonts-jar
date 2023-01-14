export interface WebsiteRegex {
  match: RegExp
  ignore?: RegExp
}

export interface Website {
  name: SupportedWebsite
  regex: WebsiteRegex
  queries: ExtractionQueries
  themes: {
    [key in Theme]?: {
      primary: string
      secondary: string
      tertiary: string
      quaternary: string
    }
  }
  styles: {
    button: { [key: string]: string }
    icon: { [key: string]: string }
  }
}

// WEBSITES

export type SupportedWebsite = "Google Fonts"

export type WebsitesSpecificStyles = {
  name: SupportedWebsite
  styles: string
}

// QUERIES

export interface ExtractionQueries {
  theme: ThemeQuery
  titleElement: string[]
  variants: string
  variableAxes: string
}

export interface ThemeQuery {
  element: string
  darkThemeClass: string
  toggle: string
}

// THEME

export type Theme = "light" | "dark"
