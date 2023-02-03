import { MagnifyingGlass } from "phosphor-react"

interface ISearch {
  value: string
  placeholder?: string
  inputClassName?: string
  iconClassName?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({
  value,
  placeholder = "Search...",
  inputClassName = "",
  iconClassName = "",
  onChange
}: ISearch) => {
  return (
    <div className="search relative flex h-full flex-1 flex-row items-center">
      <MagnifyingGlass size={18} weight="bold" className={`absolute ${iconClassName}`} />
      <input
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        className={`h-full w-full border-none font-poppins text-base text-greyscale-900  placeholder:text-greyscale-600 focus:outline-0 ${inputClassName}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
