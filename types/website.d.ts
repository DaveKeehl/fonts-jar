export interface WebsiteRegex {
  match: RegExp
  ignore?: RegExp
}

export interface Website {
  name: SupportedWebsite
  regex: WebsiteRegex
  queries: ExtractionQueries
}

// WEBSITES

export type SupportedWebsite = "Google Fonts" | "Adobe Fonts"

export type WebsitesSpecificStyles = {
  name: SupportedWebsite
  styles: string
}

// QUERIES

export interface ExtractionQueries {
  titleElement: string
  theme?: ThemeQuery
}

export interface ThemeQuery {
  element: string
  darkThemeClass: string
  toggle: string
}

// THEME

export type Theme = "light" | "dark"
