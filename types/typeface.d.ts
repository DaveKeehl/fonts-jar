import { SupportedWebsite } from "./website"

export interface ITypeface {
  family: string
  slug: string
  styles: string[]
  variableAxes: number
  origin: ITypefaceOrigin
  added_at: string
}

export interface ITypefaceV2 {
  family: string
  slug: string
  origin: ITypefaceOrigin
  added_at: string
}

export type TypefaceTuple = [string, ITypeface] // [<typeface_name>, <typeface_data>]
export type TypefaceTupleV2 = [string, ITypefaceV2] // [<typeface_name>, <typeface_data>]

export interface ITypefaceOrigin {
  name: SupportedWebsite
  url: string
}

export interface ICollection {
  name: string // the name of the collection
  typefaces: string[] // array of slugs,
  hidden: boolean
}
