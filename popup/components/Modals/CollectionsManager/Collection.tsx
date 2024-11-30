import { Eye, EyeClosed, Trash } from "@phosphor-icons/react";

import { IncludedTypefaces } from "~/popup/components/Modals/CollectionsManager/IncludedTypefaces";

import type { Collection, TypefaceTuple } from "~/types/typeface";

type Props = {
  value: string;
  data: Collection;
  favorites: TypefaceTuple[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onBlur: (name: string) => void;
  onToggleVisibility: (name: string) => void;
  onDelete: (name: string) => void;
};

export const CollectionItem = ({
  value,
  data,
  favorites,
  onChange,
  onBlur,
  onToggleVisibility,
  onDelete
}: Props) => {
  const { name, typefaces, hidden } = data;

  const ICON_SIZE = 20;
  const ICON_WEIGHT = "bold";
  const ICON_BLACK = "black";
  const ICON_RED = "red";

  return (
    <div className="flex items-center justify-between gap-4 border-b-[1px] border-greyscale-200 py-[6px] last:border-0">
      <div>
        <input
          type="text"
          className="w-full text-base font-normal leading-[24px] focus-visible:outline-0"
          value={value}
          onChange={(e) => onChange(e, name)}
          onBlur={() => onBlur(name)}
        />
        <IncludedTypefaces typefaces={typefaces} favorites={favorites} />
      </div>
      <div className="flex gap-3">
        <div onClick={() => onToggleVisibility(name)}>
          {hidden ? (
            <EyeClosed
              size={ICON_SIZE}
              weight={ICON_WEIGHT}
              color={ICON_BLACK}
              className="opacity-40 hover:cursor-pointer"
            />
          ) : (
            <Eye
              size={ICON_SIZE}
              weight={ICON_WEIGHT}
              color={ICON_BLACK}
              className="hover:cursor-pointer"
            />
          )}
        </div>
        <Trash
          size={ICON_SIZE}
          weight={ICON_WEIGHT}
          color={ICON_RED}
          className="hover:cursor-pointer"
          onClick={() => onDelete(name)}
        />
      </div>
    </div>
  );
};
