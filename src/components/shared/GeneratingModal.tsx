import { Dialog } from "@/components/design-system/overlays/Dialog";
import { P1 } from "@/components/design-system/typography/Paragraph";
import { H3 } from "@/components/design-system/typography/Heading";
import {
  SparklesIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface GeneratingModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentStep?: number;
  error?: string | null;
}

const STEPS = [
  { icon: SparklesIcon, label: "Filtrowanie miejsc..." },
  { icon: MapPinIcon, label: "Analiza geolokalizacji..." },
  { icon: MapPinIcon, label: "Optymalizacja tras..." },
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
      <div className="flex flex-col items-center gap-6 p-2">
        {error ? (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
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
            </div>
            <div className="text-center">
              <H3 className="text-red-600">Nie udało się wygenerować planu</H3>
              <P1 className="mt-2 max-w-sm text-contentSecondary">{error}</P1>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-lg bg-accentBase px-4 py-2 text-sm font-medium text-white hover:bg-accentDark"
              >
                Spróbuj ponownie
              </button>
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
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100"
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
      </div>
    </Dialog>
  );
}
