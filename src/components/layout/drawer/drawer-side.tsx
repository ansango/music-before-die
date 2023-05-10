import type { FC, ReactNode } from "react";

type Props = {
  drawerId: string;
  children: ReactNode;
};

export const DrawerSide: FC<Props> = ({ children, drawerId }) => {
  return (
    <div className="drawer-side">
      <label htmlFor={drawerId} className="drawer-overlay"></label>
      {children}
    </div>
  );
};
