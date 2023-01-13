import { useCallback } from "react"
import { Clock, TextAa } from "phosphor-react"
import { useStorage } from "@plasmohq/storage/hook"

import { ToolbarAction } from "../ToolbarAction"

import type { ISorting } from "~types/sorting"
import { ICON_SIZE } from "."

export const SortMethod = () => {
  const [method, setMethod] = useStorage<ISorting["method"]>(
    "sortMethod",
    "alphabetical"
  )

  const toggleMethod = useCallback(
    () => setMethod(method === "alphabetical" ? "time" : "alphabetical"),
    [method]
  )

  return (
    <ToolbarAction onClick={toggleMethod}>
      {method === "alphabetical" ? (
        <TextAa size={ICON_SIZE} />
      ) : (
        <Clock size={ICON_SIZE} />
      )}
    </ToolbarAction>
  )
}
