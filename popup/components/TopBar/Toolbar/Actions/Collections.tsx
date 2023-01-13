import { useCallback, useState } from "react"
import { Folder, FolderOpen } from "phosphor-react"
import { useSetAtom } from "jotai"

import { ICON_SIZE } from "."
import { ToolbarAction } from "../ToolbarAction"
import { isCollectionsManagerOpenAtom } from "~popup/atoms"

export const Collections = () => {
  const [hover, setHover] = useState(false)
  const setIsModalOpen = useSetAtom(isCollectionsManagerOpenAtom)

  const handleClick = useCallback(() => setIsModalOpen(true), [])

  return (
    <ToolbarAction
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {hover ? <FolderOpen size={ICON_SIZE} /> : <Folder size={ICON_SIZE} />}
    </ToolbarAction>
  )
}
