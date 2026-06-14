import { Button } from "@/components/design-system/atoms/Button";
import { H2, H3 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";
import {
  CalendarIcon,
  MapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function SchedulePlaceholderPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-backgroundSecondary">
          <CalendarIcon className="h-10 w-10 text-accentBase" />
        </div>

        <H2>Twój harmonogram</H2>

        <P1 className="max-w-md text-contentSecondary">
          Nie masz jeszcze aktywnego planu podróży. Wygeneruj nowy plan lub
          wybierz zapisany z Twojego profilu.
        </P1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button to="/" className="flex items-center gap-2">
          <MapIcon className="h-5 w-5" />
          Wygeneruj nowy plan
          <ArrowRightIcon className="h-4 w-4" />
        </Button>

        <Button outline to="/profile" className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Moje zapisane plany
        </Button>
      </div>

      <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <H3 className="mb-2 text-base">Jak to działa?</H3>
          <P1 className="text-sm text-contentSecondary">
            1. Wybierz miasto i preferencje na stronie głównej
            <br />
            2. Nasz algorytm wygeneruje spersonalizowany plan
            <br />
            3. Przeglądaj atrakcje dzień po dniu
          </P1>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <H3 className="mb-2 text-base">Dlaczego warto?</H3>
          <P1 className="text-sm text-contentSecondary">
            - Optymalne trasy geograficzne
            <br />
            - Dopasowane do Twoich zainteresowań
            <br />- Oszczędność czasu na planowaniu
          </P1>
        </div>
      </div>
    </div>
  );
}
