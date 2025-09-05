import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-beautiful hover:shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-beautiful",
        outline:
          "border border-border bg-background text-foreground hover:bg-card-hover shadow-elegant",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-elegant",
        ghost: "hover:bg-card-hover text-muted-foreground hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline font-medium",
        hero: "bg-gradient-primary text-primary-foreground hover:shadow-glow transform hover:scale-105 font-bold",
        cta: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-beautiful hover:shadow-glow transform hover:scale-105",
        soft: "bg-primary-light text-primary hover:bg-primary-light/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
