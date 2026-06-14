import { Button } from "@/components/design-system/atoms/Button";
import { H2 } from "@/components/design-system/typography/Heading";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { MapIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface EmptyPlanStateProps {
  message?: string;
  showGenerateButton?: boolean;
}

export function EmptyPlanState({
  message = "Brak planu do wyświetlenia",
  showGenerateButton = true,
}: EmptyPlanStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-backgroundSecondary">
        <MapIcon className="h-8 w-8 text-contentSecondary" />
      </div>

      <div className="text-center">
        <H2 className="mb-2">{message}</H2>
        <P1 className="text-contentSecondary">
          Wygeneruj nowy plan lub wybierz istniejący z profilu.
        </P1>
      </div>

      {showGenerateButton && (
        <div className="flex gap-3">
          <Button to="/" className="flex items-center gap-2">
            <ArrowPathIcon className="h-5 w-5" />
            Generuj nowy plan
          </Button>
        </div>
      )}
    </div>
  );
}
