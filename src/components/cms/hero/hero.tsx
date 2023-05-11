import type { FC } from "react";

import Balancer from "react-wrap-balancer";

import { Container } from "../../container";
import { Section } from "../../section";

export type HeroBaseProps = {
  headline?: string;
  tagline?: string;
  text?: string;
  align: "left" | "center" | "right" | null;
  rotationTitle: "left" | "center" | "right" | null;
};

const alignCnText = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const alignCnContainer = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

const rotationTitleCn = {
  left: "-rotate-[1.5deg]",
  center: "",
  right: "rotate-[1.5deg]",
};

export const HeroBase: FC<HeroBaseProps> = ({
  headline,
  tagline,
  text,
  align = "center",
  rotationTitle = "center",
}) => {
  const cnContainer = align && alignCnContainer[align];
  const cnText = align && alignCnText[align];
  const cnRotationTitle = rotationTitle && rotationTitleCn[rotationTitle];

  return (
    <Section className="w-full max-w-screen-lg mx-auto">
      <Container className={`h-[65vh] flex items-center ${cnContainer}`}>
        <div className={`space-y-5 ${cnText}`}>
          {tagline && (
            <span className="font-sans font-medium tracking-widest text-primary">
              <Balancer>{tagline}</Balancer>
            </span>
          )}
          <h1 className={`${cnRotationTitle} max-w-screen-lg`}>{headline}</h1>
          {text && (
            <span>
              <Balancer>{text}</Balancer>
            </span>
          )}
        </div>
      </Container>
    </Section>
  );
};
