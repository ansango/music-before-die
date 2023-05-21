import { DefaultContainer, DefaultMainTransition, DefaultSection, FourOhFour } from "@/components";

export default function NotFound() {
  return (
    <DefaultSection className="flex flex-col items-center justify-center h-screen space-y-5 text-center">
      <FourOhFour />
    </DefaultSection>
  );
}
