import { useCallback } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { ArrowDownRight, ArrowUpRight } from "phosphor-react"

import { ToolbarAction } from "../ToolbarAction"

import type { ISorting } from "~types/sorting"
import { ICON_SIZE } from "."

export const SortDirection = () => {
  const [direction, setDirection] = useStorage<ISorting["direction"]>("sortDirection", "ascending")

  const toggleDirection = useCallback(
    () => setDirection(direction === "ascending" ? "descending" : "ascending"),
    [direction]
  )

  return (
    <ToolbarAction onClick={toggleDirection}>
      {direction === "ascending" ? (
        <ArrowUpRight size={ICON_SIZE} />
      ) : (
        <ArrowDownRight size={ICON_SIZE} />
      )}
    </ToolbarAction>
  )
}
