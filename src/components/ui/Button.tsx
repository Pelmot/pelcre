import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: boolean;
}

interface LinkButtonProps extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
}

interface AnchorButtonProps extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
}

interface ClickButtonProps extends BaseProps {
  onClick: () => void;
  to?: never;
  href?: never;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | AnchorButtonProps | ClickButtonProps;

const variantClasses = {
  primary: "bg-ink text-paper hover:opacity-85 dark:bg-bone dark:text-ink",
  outline:
    "border border-current/30 text-inherit hover:border-current/70 hover:bg-current/5 bg-transparent",
  ghost: "bg-transparent hover:text-gold",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, icon = true } = props;

  const classes = cn(
    "group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-500",
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        target={props.href.startsWith("http") ? "_blank" : undefined}
        rel={props.href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={(props as ClickButtonProps).type ?? "button"}
      onClick={(props as ClickButtonProps).onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
