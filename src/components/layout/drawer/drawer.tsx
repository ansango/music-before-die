import type { FC, ReactNode } from "react";

type Props = {
  drawerId: string;
  children: ReactNode;
  className?: string;
};

export const Drawer: FC<Props> = ({ children, drawerId, className }) => {
  return (
    <div className={`drawer ${className}`}>
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
};
