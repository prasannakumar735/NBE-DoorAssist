import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

export default function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return <Tag className={`mx-auto max-w-[1440px] px-8 ${className}`}>{children}</Tag>;
}
