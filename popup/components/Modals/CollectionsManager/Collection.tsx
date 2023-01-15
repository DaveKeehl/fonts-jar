import { Eye, EyeClosed, Trash } from "phosphor-react"

import type { ICollection, TypefaceTuple } from "~types/typeface"

interface IIncludedTypefaces {
  typefaces: string[]
  favorites: TypefaceTuple[]
}

const IncludedTypefaces = ({ typefaces, favorites }: IIncludedTypefaces) => {
  const joinedNames = typefaces
    .map((slug) => {
      const typeface = favorites.find((favorite) => favorite[0] === slug)
      if (typeface) return typeface[1].family
      return slug
    })
    .join(", ")

  return (
    <p className="truncate-custom leading-4 text-greyscale-600">
      {typefaces.length === 0 ? "No fonts added" : joinedNames}
    </p>
  )
}

export const Collection = ({
  value,
  data,
  favorites,
  onChange,
  onBlur,
  onToggleVisibility,
  onDelete
}: {
  value: string
  data: ICollection
  favorites: TypefaceTuple[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
  onBlur: (name: string) => void
  onToggleVisibility: (name: string) => void
  onDelete: (name: string) => void
}) => {
  const { name, typefaces, hidden } = data

  const ICON_SIZE = 20
  const ICON_WEIGHT = "bold"
  const ICON_BLACK = "black"
  const ICON_RED = "red"

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
  )
}
