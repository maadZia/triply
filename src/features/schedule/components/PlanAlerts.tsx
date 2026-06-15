import { Alert } from "@/components/design-system/atoms/Alert";

interface PlanAlertsProps {
  planId: string;
  hasModifications: boolean;
  className?: string;
}

export function PlanAlerts({
  planId,
  hasModifications,
  className,
}: PlanAlertsProps) {
  return (
    <>
      {planId === "generated" && (
        <Alert variant="warning" className={className} title="Niezapisany plan">
          Zapisz plan, aby móc do niego później wrócić.
        </Alert>
      )}
      {planId !== "generated" && hasModifications && (
        <Alert
          variant="warning"
          className={className}
          title="Niezapisane zmiany"
        >
          Wprowadzono zmiany w planie. Zapisz zmiany, aby nie utracić
          modyfikacji.
        </Alert>
      )}
    </>
  );
}
