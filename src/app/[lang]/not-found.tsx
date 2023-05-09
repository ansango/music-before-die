"use client";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Container, Section, Transition } from "@/components";
import { useGetLocale, useGlobalData } from "@/lib";

export default function NotFound() {
  const { notFound } = useGlobalData();
  const { locale } = useGetLocale();
  if (!notFound) return null;
  const { title, description, link, visible } = notFound[locale];
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
            {link && (
              <Link className="block" href={`/${locale}/${link.href}`}>
                {link.label}
              </Link>
            )}
          </Container>
        </Section>
      )}
    </Transition>
  );
}
