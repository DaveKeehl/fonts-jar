import type { SupportedWebsite } from "~/types/website";

export interface Typeface {
  family: string;
  slug: string;
  origin: {
    name: SupportedWebsite;
    url: string;
  };
  added_at: string;
}

export type TypefaceTuple = [string, Typeface]; // [<typeface_name>, <typeface_data>]

export interface Collection {
  /**
   * The name of the collection
   */
  name: string;
  /**
   * Array of slugs
   */
  typefaces: string[];
  hidden: boolean;
}
