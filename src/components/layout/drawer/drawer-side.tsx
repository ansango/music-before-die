import type { FC, PropsWithChildren } from "react";

import { useGlobalDrawerId } from "./drawer";

export const DrawerSide: FC<PropsWithChildren<{ drawerId: string }>> = ({ children, drawerId }) => {
  return (
    <div className="drawer-side">
      <label htmlFor={drawerId} className="drawer-overlay"></label>
      {children}
    </div>
  );
};

export const GlobalDrawerSide: FC<PropsWithChildren> = ({ children }) => {
  const drawerId = useGlobalDrawerId();
  return <DrawerSide drawerId={drawerId}>{children}</DrawerSide>;
};
