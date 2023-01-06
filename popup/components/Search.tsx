import type React from "react"
import { MagnifyingGlass } from "phosphor-react"

import { useStorage } from "@plasmohq/storage/hook"

export const Search = () => {
  const [searchQuery, setSearchQuery] = useStorage("searchQuery", "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="search relative flex h-full flex-1 flex-row items-center">
      <MagnifyingGlass size={18} weight="bold" className="absolute left-4" />
      <input
        type="search"
        placeholder="Search..."
        autoComplete="off"
        className="h-full w-full border-none py-0 pr-4 pl-10 font-poppins text-base text-greyscale-900 [background:none] placeholder:text-greyscale-600 focus:outline-0"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  )
}
