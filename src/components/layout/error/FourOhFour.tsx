import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { useNotFound } from "@/components/context";

export const FourOhFour = () => {
  const { title, description, linkHref, linkLabel, locale } = useNotFound();
  const link = `/${locale}${linkHref}`.replace(/\/(?!.*\w)/, "") ?? `/${locale}`;
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
