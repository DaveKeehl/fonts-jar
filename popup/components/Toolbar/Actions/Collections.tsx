import { useCallback, useState } from "react"
import { Folder, FolderOpen } from "phosphor-react"

import { ICON_SIZE } from "."
import { ToolbarAction } from "../ToolbarAction"

export const Collections = () => {
  const [hover, setHover] = useState(false)

  const handleClick = useCallback(() => alert("Open collections manager"), [])

  return (
    <ToolbarAction
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {hover ? <FolderOpen size={ICON_SIZE} /> : <Folder size={ICON_SIZE} />}
    </ToolbarAction>
  )
}
