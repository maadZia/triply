import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/toast/ToastContext";

export function useSavePreferences() {
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();

  const handleSavePreferences = useCallback(() => {
    showSuccessToast("Preferencje zostały zapisane");
    navigate("/profile?tab=preferences");
  }, [navigate, showSuccessToast]);

  return { handleSavePreferences };
}
