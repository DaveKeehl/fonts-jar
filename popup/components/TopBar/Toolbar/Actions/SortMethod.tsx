import { useCallback } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { Clock, TextAa } from "@phosphor-icons/react";

import { ToolbarAction } from "~/popup/components/TopBar/Toolbar/ToolbarAction";

import type { Sorting } from "~/types/sorting";

import { ICON_SIZE } from ".";

export const SortMethod = () => {
  const [method, setMethod] = useStorage<Sorting["method"]>("sortMethod", "alphabetical");

  const title = `Sort By ${method === "alphabetical" ? "Name" : "Added Date"}`;

  const toggleMethod = useCallback(
    () => setMethod(method === "alphabetical" ? "time" : "alphabetical"),
    [method]
  );

  return (
    <ToolbarAction title={title} onClick={toggleMethod} hasDropdown>
      {method === "alphabetical" ? <TextAa size={ICON_SIZE} /> : <Clock size={ICON_SIZE} />}
    </ToolbarAction>
  );
};
