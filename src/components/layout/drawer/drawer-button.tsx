import type { FC, ReactNode } from "react";

type Props = {
  drawerId: string;
  className?: string;
  children?: ReactNode;
};

export const DrawerButton: FC<Props> = ({
  drawerId,
  children,
  className = "btn btn-sm btn-circle btn-ghost",
}) => {
  return (
    <label htmlFor={drawerId} className={className}>
      {children}
    </label>
  );
};
