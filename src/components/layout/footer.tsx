import type { FC } from "react";

import Link from "next/link";

import { useGetLocale } from "@/lib";

import { Container } from "../container";

type Props = {
  navigation: Array<LinkJSON>;
  social: Array<LinkJSON>;
};

export const Footer: FC<Props> = ({ navigation, social }) => {
  const { locale } = useGetLocale();
  return (
    <footer className="pt-20">
      <Container>
        <nav className="space-y-2">
          <ul className="flex flex-col items-end space-y-2">
            {navigation
              .filter((item) => item.visible)
              .map((item, i) => {
                const route = `/${locale}/${item.href}`;
                return (
                  <li key={`${item.label}-${i}`}>
                    <Link href={route}>{item.label}</Link>
                  </li>
                );
              })}
          </ul>
          <ul className="flex flex-col items-end space-y-2">
            {social
              .filter((item) => item.visible)
              .map((item, i) => (
                <li key={`${item.label}-${i}-external`}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
};
