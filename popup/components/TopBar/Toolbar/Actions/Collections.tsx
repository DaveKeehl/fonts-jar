import { useCallback, useState } from "react"
import { Folder, FolderOpen } from "phosphor-react"
import { useSetAtom } from "jotai"

import { ToolbarAction } from "../ToolbarAction"

import { ICON_SIZE } from "."
import { modalOpenAtom } from "~popup/atoms"

export const Collections = () => {
  const [hover, setHover] = useState(false)
  const setModalOpen = useSetAtom(modalOpenAtom)

  const handleClick = useCallback(() => setModalOpen("collections-manager"), [])

  return (
    <ToolbarAction
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {hover ? <FolderOpen size={ICON_SIZE} /> : <Folder size={ICON_SIZE} />}
    </ToolbarAction>
  )
}
