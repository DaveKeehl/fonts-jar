import { useStorage } from "@plasmohq/storage/hook"
import { ArrowDownRight, ArrowUpRight } from "phosphor-react"

import { SortBox } from "./SortBox"

import type { ISorting } from "~types/sorting"
import { useCallback } from "react"

export const SortDirection = () => {
  const [direction, setDirection] = useStorage<ISorting["direction"]>("sortDirection", "ascending")

  const toggleDirection = useCallback(
    () => setDirection(direction === "ascending" ? "descending" : "ascending"),
    [direction]
  )

  return (
    <SortBox onClick={toggleDirection}>
      {direction === "ascending" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
    </SortBox>
  )
}
