import { useCallback } from "react"
import { Globe } from "@phosphor-icons/react"
import { useSetAtom } from "jotai"

import { ToolbarAction } from "~/popup/components/TopBar/Toolbar/ToolbarAction"

import { ICON_SIZE } from "."
import { modalOpenAtom } from "~/popup/atoms"

export const OriginWebsites = () => {
  const setModalOpen = useSetAtom(modalOpenAtom)

  const handleClick = useCallback(() => setModalOpen("origin-websites"), [])

  return (
    <ToolbarAction onClick={handleClick} title="Filter By Origin Websites">
      <Globe size={ICON_SIZE} />
    </ToolbarAction>
  )
}
