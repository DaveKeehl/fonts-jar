import { useStorage } from "@plasmohq/storage/hook"
import { ArrowDownRight, ArrowUpRight } from "phosphor-react"

import { SortBox } from "./SortBox"

import type { ISorting } from "~types/sorting"

export const SortDirection = () => {
  const [direction, setDirection] = useStorage<ISorting["direction"]>("sortDirection", "ascending")

  const toggleDirection = () => setDirection(direction === "ascending" ? "descending" : "ascending")

  return (
    <SortBox onClick={toggleDirection}>
      {direction === "ascending" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
    </SortBox>
  )
}
