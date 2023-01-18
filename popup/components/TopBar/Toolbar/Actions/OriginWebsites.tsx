import { useCallback } from "react"
import { Globe } from "phosphor-react"

import { ToolbarAction } from "../ToolbarAction"

import { ICON_SIZE } from "."

export const OriginWebsites = () => {
  const handleClick = useCallback(() => alert("origin websites"), [])

  return (
    <ToolbarAction onClick={handleClick}>
      <Globe size={ICON_SIZE} />
    </ToolbarAction>
  )
}
