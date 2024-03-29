import { CaretDown } from "phosphor-react"

interface IToolbarAction {
  children: React.ReactNode
  title: string
  hasDropdown?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const ToolbarAction = ({
  children,
  title,
  hasDropdown,
  onClick,
  onMouseEnter,
  onMouseLeave
}: IToolbarAction) => {
  return (
    <div
      className="group flex h-full items-center gap-[4px] border-l-[1px] border-greyscale-100 py-0 px-3 transition-all duration-200 hover:cursor-pointer hover:bg-greyscale-300"
      title={title}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
      {hasDropdown && (
        <CaretDown
          size={12}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-y-[3px]"
        />
      )}
    </div>
  )
}
