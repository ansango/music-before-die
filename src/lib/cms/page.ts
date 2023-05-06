import tinaClient from "../../../tina/__generated__/client";
import type { En_PageQuery, Es_PageQuery } from "../../../tina/__generated__/types";

type Params = {
  filename: string;
};

type PageEn = En_PageQuery["en_page"];

export async function getPageEn({ params }: { params: Params }) {
  const args = { relativePath: `${params.filename}.mdx` };

  try {
    const {
      data: { en_page: page },
    } = await tinaClient.queries.en_page(args);

    return page as PageEn;
  } catch (error) {
    console.error("Error while getting page", error);
    return null;
  }
}

type PageEs = Es_PageQuery["es_page"];

export async function getPageEs({ params }: { params: Params }) {
  const args = { relativePath: `${params.filename}.mdx` };

  try {
    const {
      data: { es_page: page },
    } = await tinaClient.queries.es_page(args);

    return page as PageEs;
  } catch (error) {
    console.error("Error while getting page", error);
    return null;
  }
}

export const getPageLocale = {
  es: getPageEs,
  en: getPageEn,
};
