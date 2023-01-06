import { X } from "phosphor-react"

import type { ITypeface } from "types/typeface"

interface IFavorite {
  favorite: ITypeface
}

export const Favorite = ({ favorite }: IFavorite) => {
  const { origin, family, styles, variableAxes } = favorite

  const stylesText = `${styles.length} style${styles.length > 1 ? "s" : ""}`
  const variableAxesText = variableAxes > 0 ? `(variable - ${variableAxes} axes)` : ""

  return (
    <div className="group flex items-center justify-between border-b border-greyscale-200 px-4 py-3 last:border-none">
      <div>
        <a
          href={origin.url}
          target="_blank"
          className="mb-[2px] block text-lg font-medium no-underline [line-height:1.2] hover:cursor-ne-resize hover:underline">
          {family}
        </a>
        <p className="text-sm text-greyscale-700 opacity-70">
          {stylesText} {variableAxesText}
        </p>
      </div>
      <div className="rounded bg-red-500 p-1 opacity-0 transition-colors duration-100 hover:cursor-pointer hover:bg-red-600 active:bg-red-500 group-hover:opacity-100">
        <X size={16} weight="bold" color="white" className="" />
      </div>
    </div>
  )
}
