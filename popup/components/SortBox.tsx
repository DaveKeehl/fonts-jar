import { CaretDown } from "phosphor-react"

interface ISortBox {
  children: React.ReactNode
  onClick?: () => void
}

export const SortBox = ({ children, onClick }: ISortBox) => {
  return (
    <div
      className="group flex h-full items-center gap-[6px] border-l-[1px] border-greyscale-100 py-0 px-2 transition-all duration-200 hover:cursor-pointer hover:bg-greyscale-300"
      onClick={onClick}>
      {children}
      <CaretDown
        size={12}
        weight="bold"
        className="transition-transform duration-200 group-hover:translate-y-[3px]"
      />
    </div>
  )
}
