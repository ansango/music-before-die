import type { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
  drawerId: string;
};

export const DrawerButton: FC<PropsWithChildren<Props>> = ({
  drawerId,
  children,
  className = "",
}) => {
  return (
    <label htmlFor={drawerId} className={className}>
      {children}
    </label>
  );
};
