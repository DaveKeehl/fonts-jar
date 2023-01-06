import { useAtom } from "jotai"
import { ArrowDownRight, ArrowUpRight } from "phosphor-react"

import { sortDirectionAtom } from "../atoms"
import { SortBox } from "./SortBox"

export const SortDirection = () => {
  const [direction, setDirection] = useAtom(sortDirectionAtom)

  const toggleDirection = () => setDirection(direction === "ascending" ? "descending" : "ascending")

  return (
    <SortBox onClick={toggleDirection}>
      {direction === "ascending" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
    </SortBox>
  )
}
