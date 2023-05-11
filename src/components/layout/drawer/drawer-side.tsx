import type { FC, ReactNode } from "react";

import { useGlobalDrawerId } from "./drawer";

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

export const GlobalDrawerSide: FC<Pick<Props, "children">> = ({ children }) => {
  const drawerId = useGlobalDrawerId();
  return <DrawerSide drawerId={drawerId}>{children}</DrawerSide>;
};
