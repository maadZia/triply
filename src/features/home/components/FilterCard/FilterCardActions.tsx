import { Button } from "@/components/design-system/atoms/Button";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGenerate = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    onGenerate();
  };

  return (
    <section className="mt-8 flex w-full justify-center gap-4">
      <Button
        outline
        onClick={onSavePreferences}
        disabled={!canSavePreferences || isGenerating}
      >
        Zapisz preferencje
      </Button>
      <Button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? "Generowanie..." : "Generuj plan"}
      </Button>
    </section>
  );
}
