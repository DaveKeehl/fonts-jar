import { useAtom } from "jotai"
import { Clock, TextAa } from "phosphor-react"

import { sortMethodAtom } from "../atoms"
import { SortBox } from "./SortBox"

export const SortMethod = () => {
  const [method, setMethod] = useAtom(sortMethodAtom)

  const toggleMethod = () => setMethod(method === "alphabetical" ? "time" : "alphabetical")

  return (
    <SortBox onClick={toggleMethod}>
      {method === "alphabetical" ? <TextAa size={20} /> : <Clock size={20} />}
    </SortBox>
  )
}
