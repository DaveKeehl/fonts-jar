import { SortDirection, SortMethod, Collections } from "./Actions"

export const Toolbar = () => {
  return (
    <div className="flex h-full">
      <SortMethod />
      <SortDirection />
      <Collections />
    </div>
  )
}
