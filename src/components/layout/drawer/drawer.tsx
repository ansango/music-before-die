import type { FC, PropsWithChildren } from "react";

import { useGlobalContext } from "@/components/context";

type Props = PropsWithChildren<{
  drawerId: string;
  className?: string;
}>;

export const Drawer: FC<Props> = ({ children, drawerId, className = "" }) => {
  return (
    <div className={`drawer ${className}`.trim()}>
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
};

export const useGlobalDrawerId = () => {
  const { globalDrawer: drawerId } = useGlobalContext();
  return drawerId || "app-drawer";
};

export const GlobalDrawer: FC<Pick<Props, "children" | "className">> = ({
  children,
  className = "",
}) => {
  const drawerId = useGlobalDrawerId();
  return (
    <Drawer drawerId={drawerId} className={className}>
      {children}
    </Drawer>
  );
};
