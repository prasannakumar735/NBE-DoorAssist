import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  outline: "border border-gray-300 text-text-primary hover:bg-brand-light",
  ghost: "text-brand hover:bg-brand-light",
};

interface ButtonOwnProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = ButtonOwnProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-3 font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:opacity-60";

  const classes = `${base} ${variantClass[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, variant: _v, className: _c, children: ch, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {ch}
      </Link>
    );
  }

  const p = props as ButtonHTMLAttributes<HTMLButtonElement> & ButtonOwnProps;
  const { type = "button", variant: _v, className: _c, children: ch, ...rest } = p;
  return (
    <button type={type} className={classes} {...rest}>
      {ch}
    </button>
  );
}
