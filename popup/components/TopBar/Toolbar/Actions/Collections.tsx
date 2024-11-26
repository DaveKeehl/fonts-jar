import { useCallback, useState } from "react";
import { Folder, FolderOpen } from "@phosphor-icons/react";
import { useSetAtom } from "jotai";

import { ToolbarAction } from "~/popup/components/TopBar/Toolbar/ToolbarAction";

import { modalOpenAtom } from "~/utils/atoms";

import { ICON_SIZE } from ".";

export const Collections = () => {
  const [hover, setHover] = useState(false);
  const setModalOpen = useSetAtom(modalOpenAtom);

  const handleClick = useCallback(() => setModalOpen("collections-manager"), []);

  return (
    <ToolbarAction
      title="Collections Manager"
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <FolderOpen size={ICON_SIZE} /> : <Folder size={ICON_SIZE} />}
    </ToolbarAction>
  );
};
