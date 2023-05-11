import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const DrawerContent: FC<Props> = ({ children, className }) => {
  return <div className={`drawer-content ${className}`.trim()}>{children}</div>;
};
