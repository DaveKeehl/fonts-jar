interface IButton {
  children: React.ReactNode
  state: "default" | "danger"
  onClick?: () => void
}

export const Button = ({ children, state, onClick }: IButton) => {
  const colors: { [key in IButton["state"]]: { bg: string; bgHover: string; bgActive: string } } = {
    default: {
      bg: "bg-greyscale-200",
      bgHover: "hover:bg-greyscale-300",
      bgActive: "active:bg-greyscale-200"
    },
    danger: {
      bg: "bg-red-500",
      bgHover: "hover:bg-red-600",
      bgActive: "active:bg-red-500"
    }
  }

  return (
    <div
      className={`flex aspect-square w-7 items-center justify-center rounded ${colors[state].bg} p-1 transition-colors duration-100 hover:cursor-pointer ${colors[state].bgHover} ${colors[state].bgActive}`}
      onClick={onClick}>
      {children}
    </div>
  )
}
