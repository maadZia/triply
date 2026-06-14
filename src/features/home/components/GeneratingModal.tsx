import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@/components/design-system/overlays/Dialog";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { H3 } from "@/components/design-system/typography/Heading";
import {
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/design-system/atoms/Button";

interface GeneratingModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentStep?: number;
  error?: string | null;
}

const STEPS = [
  { icon: SparklesIcon, label: "Filtrowanie miejsc..." },
  { icon: MapPinIcon, label: "Analiza geolokalizacji..." },
  { icon: ClockIcon, label: "Optymalizacja tras..." },
  { icon: CheckCircleIcon, label: "Finalizowanie planu..." },
];

export function GeneratingModal({
  isOpen,
  onClose,
  currentStep = 0,
  error,
}: GeneratingModalProps) {
  const canClose = Boolean(error) && Boolean(onClose);

  return (
    <Dialog open={isOpen} onClose={canClose && onClose ? onClose : () => {}}>
      <DialogPanel className="flex flex-col gap-6">
        {error ? (
          <>
            <DialogTitle className="flex items-center gap-2">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <H3 className="text-red-600">Nie udało się wygenerować planu</H3>
            </DialogTitle>
            <P1 className="text-contentSecondary">{error}</P1>
            {onClose && (
              <Button onClick={onClose} className="mx-auto">
                Spróbuj ponownie
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-accentBase" />
              <SparklesIcon className="h-8 w-8 text-accentBase" />
            </div>

            <div className="text-center">
              <H3>Generowanie planu...</H3>
              <P1 className="mt-2 text-contentSecondary">
                Nasz algorytm dobiera optymalne atrakcje dla Ciebie
              </P1>
            </div>

            {/* Progress steps */}
            <div className="w-full max-w-xs space-y-2">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive
                        ? "bg-accentBase/10 text-accentDark"
                        : isCompleted
                          ? "text-contentSecondary"
                          : "text-gray-300"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-accentBase text-white"
                          : isCompleted
                            ? " text-green-600"
                            : "bg-transparent"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : (
                        <Icon className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span className="text-sm">
                      {isCompleted ? "Zakończone" : step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <P1 className="text-xs text-contentSecondary">
              To może potrwać kilka sekund...
            </P1>
          </>
        )}
      </DialogPanel>
    </Dialog>
  );
}
