import { Clock, TextAa } from "phosphor-react"
import { useStorage } from "@plasmohq/storage/hook"

import { SortBox } from "./SortBox"

import type { ISorting } from "~types/sorting"

export const SortMethod = () => {
  const [method, setMethod] = useStorage<ISorting["method"]>("sortMethod", "alphabetical")

  const toggleMethod = () => setMethod(method === "alphabetical" ? "time" : "alphabetical")

  return (
    <SortBox onClick={toggleMethod}>
      {method === "alphabetical" ? <TextAa size={20} /> : <Clock size={20} />}
    </SortBox>
  )
}
