import { Storage } from "@plasmohq/storage"
import type { TypefaceTuple } from "types/typeface"

export const storage = new Storage()

/**
 * Utility function to get a map representation of the favorite fonts from chrome.storage.sync.
 * @returns A map data structure of the favorite fonts.
 */
export const getFavorites = async () => {
  return new Map((await storage.get("favorites")) as TypefaceTuple[])
}
