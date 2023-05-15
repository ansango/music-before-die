import type { FC } from "react";

import type { BodySimpleProps, HeroBaseProps } from "@/components/cms";

import type { PagesQuery } from "../../../tina/__generated__/types";

import { BodySimple } from "./bodies";
import { HeroBase } from "./hero";

export const PageBlocks: FC<{ blocks: PagesQuery["pages"]["blocks"] }> = ({ blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        const key = `${block?.__typename}-${index}`;
        switch (block?.__typename) {
          case "PagesBlocksHeroBase": {
            if (!block?.visible) return null;
            return <HeroBase key={key} {...(block as HeroBaseProps)} />;
          }
          case "PagesBlocksBodySimple": {
            if (!block.visible || block.content.children.length === 0) return null;
            return <BodySimple key={key} {...(block as BodySimpleProps)} />;
          }
          default: {
            return null;
          }
        }
      })}
    </>
  );
};
