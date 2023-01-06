interface INothingToShow {
  children: React.ReactNode
}

export const NothingToShow = ({ children }: INothingToShow) => {
  return <p className="p-6 font-poppins text-base">{children}</p>
}
