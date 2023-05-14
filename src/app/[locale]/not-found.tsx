import { DefaultContainer, DefaultMainTransition, DefaultSection, FourOhFour } from "@/components";

export default function NotFound() {
  return (
    <DefaultMainTransition>
      <DefaultSection className="flex flex-col items-center justify-center h-screen">
        <DefaultContainer className="space-y-5 text-center">
          <FourOhFour />
        </DefaultContainer>
      </DefaultSection>
    </DefaultMainTransition>
  );
}
