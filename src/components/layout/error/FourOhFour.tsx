import type { FC } from "react";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { useNotFound } from "@/components/context";

export const FourOhFour: FC = () => {
  const { title, description, linkHref, linkLabel } = useNotFound();
  const link = `/${linkHref}`.replace(/\/(?!.*\w)/, "");
  return (
    <>
      <h1>
        <span>
          404 - <br className="sm:hidden" />
          <br className="hidden md:block" />
          {title}
        </span>
      </h1>
      <p>
        <Balancer>{description}</Balancer>
      </p>

      <Link className="block" href={link}>
        {linkLabel}
      </Link>
    </>
  );
};
