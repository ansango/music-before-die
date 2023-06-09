import type { FC, PropsWithChildren } from "react";

export const DefaultContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`w-full max-w-screen-2xl p-4 sm:p-6 md:p-12 mx-auto ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};
