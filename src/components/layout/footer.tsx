import type { FC } from "react";

import Link from "next/link";

import { useGetLocale } from "@/lib";

import { Container } from "../container";

export const Footer: FC = () => {
  const { locale } = useGetLocale();
  const navigation = [];
  const social = [];
  return (
    <footer className="pt-20 bg-neutral">
      <Container className="max-w-screen-lg p-10 footer text-neutral-content">
        <div>
          <span className="footer-title">Navigation</span>
          {navigation.map((item, i) => {
            const route = `/${locale}/${item.href}`;
            return (
              <Link
                className="link link-hover underline-offset-4"
                key={`${item.label}-${i}`}
                href={route}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div>
          <span className="footer-title">Social</span>
          {social.map((item, i) => (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover underline-offset-4"
              key={`${item.label}-${i}-external`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden">
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </Container>
    </footer>
  );
};
