import { Button } from "@/components/design-system/atoms/Button";
import { H2 } from "@/components/design-system/typography/Heading";
import { P3 } from "@/components/design-system/typography/Paragraph";
import { Input } from "@/components/design-system/forms/Input";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/components/utils";
import type { GeneratedPlan } from "@/types/plan";
import type { usePlanNameEditing } from "@/features/schedule/hooks/usePlanNameEditing";

interface PlanHeaderSectionProps {
  planId: string;
  editablePlan: GeneratedPlan;
  nameEditing: ReturnType<typeof usePlanNameEditing>;
  className?: string;
}

export function PlanHeaderSection({
  planId,
  editablePlan,
  nameEditing,
  className,
}: PlanHeaderSectionProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {nameEditing.isEditingName ? (
        <div className="flex items-center gap-1">
          <Input
            value={nameEditing.planNameInput}
            onChange={(e) => nameEditing.setPlanNameInput(e.target.value)}
            onKeyDown={nameEditing.handleNameInputKeyDown}
            placeholder="Nazwa planu"
            autoFocus
            className="min-w-40"
          />
          <Button
            plain
            onClick={nameEditing.handleSaveName}
            className="p-0 shrink-0 text-accentDark"
            title="Zapisz nazwę"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button
            plain
            onClick={nameEditing.handleCancelEditName}
            className="p-0 shrink-0 text-contentDesctructive"
            title="Anuluj"
          >
            <XMarkIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <H2 className="flex-1 truncate">
            {editablePlan.name ||
              (planId === "generated" ? "Nowy plan" : "Plan bez nazwy")}
          </H2>
          <Button
            plain
            onClick={nameEditing.handleStartEditingName}
            className="h-7 w-7 p-0 shrink-0 text-contentSecondary hover:text-accentDark"
            title="Edytuj nazwę"
          >
            <PencilIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
      <P3 className="text-contentSecondary">{editablePlan.city}</P3>
    </div>
  );
}
