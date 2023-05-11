"use client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Container, Section, Transition } from "@/components";
import { GlobalProvider, useNotFound } from "@/components/context";

const FourOhFour = () => {
  const { title, description, linkHref, linkLabel } = useNotFound();

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

      <Link className="block" href={linkHref ?? "/"}>
        {linkLabel}
      </Link>
    </>
  );
};

export default function NotFound() {
  return (
    <GlobalProvider>
      <Transition>
        <Section className="flex flex-col items-center justify-center h-screen">
          <Container className="space-y-5 text-center">
            <FourOhFour />
          </Container>
        </Section>
      </Transition>
    </GlobalProvider>
  );
}
