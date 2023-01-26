import { SortDirection, SortMethod, Collections } from "./Actions"
import { OriginWebsites } from "./Actions/OriginWebsites"

export const Toolbar = () => {
  return (
    <div className="flex h-full">
      <SortMethod />
      <SortDirection />
      <OriginWebsites />
      <Collections />
    </div>
  )
}
