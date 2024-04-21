import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
  children: string;
  href: string;
}

export function NavLinkDefault(props: NavLinkProps) {
  return (
    <a
      {...props}
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      {props.children}
    </a>
  );
}

export function NavLinkActive(props: NavLinkProps) {
  return (
    <a
      {...props}
      className="text-foreground transition-colors hover:text-foreground"
    >
      {props.children}
    </a>
  );
}
