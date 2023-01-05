import {
  ArrowDownRight,
  ArrowUpRight,
  CaretDown,
  Clock,
  MagnifyingGlass,
  TextAa
} from "phosphor-react"
import type React from "react"
import { useState } from "react"

const Search = () => {
  return (
    <div className="search relative flex h-full flex-1 flex-row items-center">
      <MagnifyingGlass size={18} weight="bold" className="absolute left-4" />
      <input
        type="search"
        placeholder="Search..."
        autoComplete="off"
        className="h-full w-full border-none py-0 pr-4 pl-10 font-poppins text-base text-greyscale-900 [background:none] placeholder:text-greyscale-600 focus:outline-0"
      />
    </div>
  )
}

const SortBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center gap-[6px] border-l-[1px] border-greyscale-100 py-0 px-2 transition-all duration-200 hover:cursor-pointer hover:bg-greyscale-300">
      {children}
      <CaretDown size={12} weight="bold" className="transition-transform duration-200" />
    </div>
  )
}

interface ISorting {
  method: "alphabetical" | "time"
  direction: "ascending" | "descending"
}

const SortMethod = ({ method }: { method: ISorting["method"] }) => {
  return <SortBox>{method === "alphabetical" ? <TextAa size={20} /> : <Clock size={20} />}</SortBox>
}

const SortDirection = ({ direction }: { direction: ISorting["direction"] }) => {
  return (
    <SortBox>
      {direction === "ascending" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
    </SortBox>
  )
}

export const TopBar = () => {
  const [method, setMethod] = useState<ISorting["method"]>("alphabetical")
  const [direction, setDirection] = useState<ISorting["direction"]>("ascending")

  return (
    <div className="flex h-10 items-center bg-greyscale-200">
      <Search />
      <SortMethod method={method} />
      <SortDirection direction={direction} />
    </div>
  )
}
