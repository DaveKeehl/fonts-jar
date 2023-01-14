import { useStorage } from "@plasmohq/storage/hook"

import { Search } from "../Search"
import { Toolbar } from "./Toolbar"

export const TopBar = () => {
  const [searchQuery, setSearchQuery] = useStorage("searchQuery", "")

  return (
    <div className="flex h-10 items-center bg-greyscale-200">
      <Search
        value={searchQuery}
        inputClassName="bg-greyscale-200 py-0 pr-4 pl-10"
        iconClassName="left-4"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Toolbar />
    </div>
  )
}
