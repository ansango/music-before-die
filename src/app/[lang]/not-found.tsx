"use client";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Container, Section, Transition } from "@/components";
import { useGlobalData } from "@/lib";

export default function NotFound() {
  const {
    locale,
    notFound: { title, description, visible, label, href },
  } = useGlobalData();

  return (
    <Transition>
      {visible && (
        <Section className="flex flex-col items-center justify-center h-screen">
          <Container className="space-y-5 text-center">
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
            <Link className="block" href={`/${locale}/${href}`}>
              {label}
            </Link>
          </Container>
        </Section>
      )}
    </Transition>
  );
}
