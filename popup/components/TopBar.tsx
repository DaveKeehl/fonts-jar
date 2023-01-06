import { Search } from "./Search"
import { SortDirection } from "./SortDirection"
import { SortMethod } from "./SortMethod"

export const TopBar = () => {
  return (
    <div className="flex h-10 items-center bg-greyscale-200">
      <Search />
      <SortMethod />
      <SortDirection />
    </div>
  )
}
