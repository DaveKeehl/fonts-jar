import { SupportedWebsite } from "../types"

export interface ITypeface {
  family: string
  slug: string
  styles: string[]
  variableAxes: number
  origin: TypefaceOrigin
  added_at: string
  collections: string[]
}

export type TypefaceTuple = [string, Typeface] // [<typeface_name>, <typeface_data>]

export interface ITypefaceOrigin {
  name: SupportedWebsite
  url: string
}
