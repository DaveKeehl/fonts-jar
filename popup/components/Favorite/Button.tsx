import { cva, type VariantProps } from "cva"

interface IButton extends VariantProps<typeof button> {
  children: React.ReactNode
  onClick?: () => void
}

const button = cva(
  "flex aspect-square w-7 items-center justify-center rounded p-1 transition-colors duration-100 hover:cursor-pointer",
  {
    variants: {
      intent: {
        primary: "bg-greyscale-200 hover:bg-greyscale-300 active:bg-greyscale-200",
        danger: "bg-red-500 hover:bg-red-600 active:bg-red-500"
      }
    },
    defaultVariants: {
      intent: "primary"
    }
  }
)

export const Button = ({ children, intent, onClick }: IButton) => {
  return (
    <div className={button({ intent })} onClick={onClick}>
      {children}
    </div>
  )
}
