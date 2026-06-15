import { Button } from "@/components/design-system/atoms/Button";

interface FilterCardActionsProps {
  onSavePreferences: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  canSavePreferences: boolean;
}

export function FilterCardActions({
  onSavePreferences,
  onGenerate,
  isGenerating,
  canSavePreferences,
}: FilterCardActionsProps) {
  return (
    <section className="mt-8 flex w-full justify-center gap-4">
      <Button
        outline
        onClick={onSavePreferences}
        disabled={!canSavePreferences || isGenerating}
      >
        Zapisz preferencje
      </Button>
      <Button onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? "Generowanie..." : "Generuj plan"}
      </Button>
    </section>
  );
}
