import type { FC, PropsWithChildren } from "react";

export const DrawerContent: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={`drawer-content ${className}`.trim()}>{children}</div>;
};
