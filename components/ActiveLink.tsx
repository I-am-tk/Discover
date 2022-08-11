import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children, ReactElement } from "react";

type ActiveLinkPropType = React.ComponentPropsWithoutRef<typeof Link> & { activeClassName: string };
const ActiveLink = ({ children, activeClassName, ...props }: ActiveLinkPropType) => {
  const { asPath } = useRouter();

  const child = Children.only(children);

  if (!React.isValidElement(child)) {
    throw new Error("ActiveLink must have a child");
  }

  const childClassName = child.props.className;

  const isActive = asPath === props.href || asPath === props.as;
  const className = isActive ? `${childClassName} ${activeClassName}`.trim() : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
