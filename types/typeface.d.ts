import { SupportedWebsite } from "./website"

export interface ITypeface {
  family: string
  slug: string
  styles: string[]
  variableAxes: number
  origin: ITypefaceOrigin
  added_at: string
  collections: string[]
}

export type TypefaceTuple = [string, ITypeface] // [<typeface_name>, <typeface_data>]

export interface ITypefaceOrigin {
  name: SupportedWebsite
  url: string
}
