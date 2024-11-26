import { useCallback } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";
import { capitalize } from "lodash";

import { ToolbarAction } from "~/popup/components/TopBar/Toolbar/ToolbarAction";

import type { Sorting } from "~/types/sorting";

import { ICON_SIZE } from ".";

export const SortDirection = () => {
  const [direction, setDirection] = useStorage<Sorting["direction"]>("sortDirection", "ascending");

  const toggleDirection = useCallback(
    () => setDirection(direction === "ascending" ? "descending" : "ascending"),
    [direction]
  );

  return (
    <ToolbarAction onClick={toggleDirection} title={`Sort ${capitalize(direction)}`} hasDropdown>
      {direction === "ascending" ? (
        <ArrowUpRight size={ICON_SIZE} />
      ) : (
        <ArrowDownRight size={ICON_SIZE} />
      )}
    </ToolbarAction>
  );
};
