import { useState, useCallback, type ReactNode } from "react";
import { Toast } from "@/components/design-system/overlays/Toast";
import { ToastContext } from "./ToastContext";

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [toastKey, setToastKey] = useState(0);

  const showSuccessToast = useCallback((message: string) => {
    setToastKey((key) => key + 1);
    setToast({ open: true, message });
  }, []);

  const handleClose = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showSuccessToast }}>
      {children}
      <Toast
        key={toastKey}
        open={toast.open}
        message={toast.message}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}
