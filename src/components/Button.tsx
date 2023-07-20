import applyClasses from "../utils/helpers";

type ButtonType = "button" | "submit" | "reset";
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const classes = {
  base: "w-fit rounded-[30px] select-none font-extrabold uppercase transition focus:ring ease-in-out duration-200", // TODO: add transition
  variant: {
    primary: "bg-primary text-background",
    secondary: "bg-background text-primary border-[3px] border-primary",
  },
  size: {
    sm: "text-sm px-10 py-3",
    md: "text-md px-16 py-3",
    lg: "text-lg px-24 py-3",
  },
  disabled: "opacity-50 cursor-not-allowed",
  hoverFocusActive: (variant: string) =>
    ({
      primary:
        "hover:bg-primary-dark focus:ring-primary-darker active:bg-primary-darker active:translate-y-1",
      secondary:
        "hover:border-primary/[.8] hover:text-primary/[.8] active:bg-primary/[.05] active:translate-y-1",
    }[variant]),
};

export default function Button({
  children,
  className,
  type = "button",
  size = "lg",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={applyClasses(`
      ${classes.base}
      ${classes.variant[variant]}
      ${classes.size[size]}
      ${!disabled && classes.hoverFocusActive(variant)}
      ${disabled && classes.disabled}
      ${className}
      `)}
    >
      {children}
    </button>
  );
}
