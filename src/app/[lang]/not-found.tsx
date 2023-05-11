import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Container, Section, Transition } from "@/components";
import { GlobalProvider } from "@/components/context";
import { useGetLocale, getGlobal } from "@/lib";

export default async function NotFound() {
  const global = await getGlobal();

  // if (!notFound) return null;
  // const { title, description, link, visible } = notFound[locale];
  return (
    <GlobalProvider {...global}>Not found</GlobalProvider>
    // <Transition>
    //   {visible && (
    //     <Section className="flex flex-col items-center justify-center h-screen">
    //       <Container className="space-y-5 text-center">
    //         <h1>
    //           <span>
    //             404 - <br className="sm:hidden" />
    //             <br className="hidden md:block" />
    //             {title}
    //           </span>
    //         </h1>
    //         <p>
    //           <Balancer>{description}</Balancer>
    //         </p>
    //         {link && (
    //           <Link className="block" href={`/${locale}/${link.href}`}>
    //             {link.label}
    //           </Link>
    //         )}
    //       </Container>
    //     </Section>
    //   )}
    // </Transition>
  );
}
