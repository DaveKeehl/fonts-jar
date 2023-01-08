import { useCallback } from "react"
import { Clock, TextAa } from "phosphor-react"
import { useStorage } from "@plasmohq/storage/hook"

import { SortBox } from "./SortBox"

import type { ISorting } from "~types/sorting"

export const SortMethod = () => {
  const [method, setMethod] = useStorage<ISorting["method"]>("sortMethod", "alphabetical")

  const toggleMethod = useCallback(
    () => setMethod(method === "alphabetical" ? "time" : "alphabetical"),
    [method]
  )

  return (
    <SortBox onClick={toggleMethod}>
      {method === "alphabetical" ? <TextAa size={20} /> : <Clock size={20} />}
    </SortBox>
  )
}
