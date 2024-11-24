interface Props {
  children: React.ReactNode
}

export const NothingToShow = ({ children }: Props) => {
  return <p className="px-4 py-6 font-poppins text-base">{children}</p>
}
