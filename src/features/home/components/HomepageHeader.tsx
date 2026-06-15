import { H1 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";

export function HomepageHeader() {
  return (
    <header className="space-y-2">
      <H1>Generator planu</H1>
      <P1 className="text-contentSecondary">
        Zdefiniuj swój wymarzony dzień. Nasz algorytm przygotuje dla Ciebie
        spersonalizowany plan zwiedzania w kilka sekund.
      </P1>
    </header>
  );
}
