import { Search } from "./Search"
import { Toolbar } from "./Toolbar"

export const TopBar = () => {
  return (
    <div className="flex h-10 items-center bg-greyscale-200">
      <Search />
      <Toolbar />
    </div>
  )
}
