import type { FC, PropsWithChildren } from "react";

export const DefaultSection: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out overflow-hidden ${className}`.trim()}
    >
      {children}
    </section>
  );
};
