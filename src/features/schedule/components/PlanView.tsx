import { useState } from "react";
import type { GeneratedPlan } from "@/types/plan";
import { formatDateForDisplay } from "@/types/plan";
import { Button } from "@/components/design-system/atoms/Button";
import { DayTabs } from "@/features/schedule/components/DayTabs";
import { DayContainer } from "./DayContainer";
import { EmptyPlanState } from "./EmptyPlanState";
import { PlaceDetailsDialog } from "@/components/shared/PlaceDetails/PlaceDetailsDialog";
import { Popup } from "@/components/design-system/overlays/Popup";
import { PlusIcon } from "@heroicons/react/24/outline";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { PlaceCard } from "./PlaceCard";
import { Tabs, TabItem } from "@/components/design-system/navigation/Tabs";
import { ExpandableCard } from "@/components/design-system/cards/ExpandableCard";
import { PlanHeaderSection } from "./PlanHeaderSection";
import { PlanMapPanel } from "./PlanMapPanel";
import { PlanAlerts } from "./PlanAlerts";
import { useEditablePlan } from "@/features/schedule/hooks/useEditablePlan";
import { usePlanDaySelection } from "@/features/schedule/hooks/usePlanDaySelection";
import { usePlanMapData } from "@/features/schedule/hooks/usePlanMapData";
import { usePlanNameEditing } from "@/features/schedule/hooks/usePlanNameEditing";
import { usePlanPlaceDialog } from "@/features/schedule/hooks/usePlanPlaceDialog";
import { usePlanDayManagement } from "@/features/schedule/hooks/usePlanDayManagement";
import { useMediaQuery } from "usehooks-ts";
import { usePlanDragAndDrop } from "@/features/schedule/hooks/usePlanDragAndDrop";

interface PlanViewProps {
  plan: GeneratedPlan;
  onSavePlan?: () => void;
}

type MobileViewTab = "plan" | "map";

export function PlanView({ plan, onSavePlan }: PlanViewProps) {
  const { editablePlan, updatePlan, hasModifications } = useEditablePlan(plan);
  const { selectedDayIndex, setSelectedDayIndex, selectedDay } =
    usePlanDaySelection(editablePlan);
  const { allCityPlaces, selectedPlaceIds, mapMarkers, mapCenter } =
    usePlanMapData(editablePlan, selectedDay);
  const nameEditing = usePlanNameEditing(plan, editablePlan, updatePlan);
  const placeDialog = usePlanPlaceDialog({
    selectedDayIndex,
    updatePlan,
    allCityPlaces,
    selectedPlaceIds,
  });
  const dayManagement = usePlanDayManagement({
    editablePlan,
    updatePlan,
    selectedDayIndex,
    setSelectedDayIndex,
  });
  const dnd = usePlanDragAndDrop({
    editablePlan,
    updatePlan,
    setSelectedDayIndex,
  });
  const [mobileViewTab, setMobileViewTab] = useState<MobileViewTab>("plan");
  const isLgUp = useMediaQuery("(min-width: 1024px)");

  const dayTabsData = editablePlan.days.map((day) => ({
    id: day.day,
    label: `Dzień ${day.day}`,
    date: day.date ? formatDateForDisplay(day.date) : undefined,
  }));

  const selectedDayTitle = selectedDay ? (
    <span>
      Dzień {selectedDay.day}
      {selectedDay.date && (
        <span className="font-normal text-contentSecondary">
          {" · "}
          {formatDateForDisplay(selectedDay.date)}
        </span>
      )}
    </span>
  ) : (
    "Wybierz dzień"
  );

  const saveButton = onSavePlan ? (
    <Button
      onClick={onSavePlan}
      disabled={plan.id !== "generated" && !hasModifications}
      className="flex shrink-0 items-center gap-1 text-sm"
    >
      {plan.id === "generated" ? "Zapisz plan" : "Zapisz zmiany"}
    </Button>
  ) : null;

  if (!editablePlan.days.length) {
    return <EmptyPlanState message="Plan nie zawiera żadnych dni" />;
  }

  return (
    <DndContext
      sensors={dnd.sensors}
      collisionDetection={closestCorners}
      onDragStart={dnd.handleDragStart}
      onDragOver={dnd.handleDragOver}
      onDragEnd={dnd.handleDragEnd}
    >
      {isLgUp ? (
        <div className="flex min-h-[80vh] gap-2 overflow-hidden">
          <aside className="w-56 shrink-0 overflow-y-auto">
            <div className="p-4">
              <PlanHeaderSection
                planId={plan.id}
                editablePlan={editablePlan}
                nameEditing={nameEditing}
              />
            </div>

            <DayTabs
              days={dayTabsData}
              selectedIndex={selectedDayIndex}
              onSelect={setSelectedDayIndex}
              dragOverDayIndex={dnd.dragOverDayIndex}
            />

            <div className="px-4 pb-4">
              <Button
                outline
                onClick={dayManagement.handleAddDay}
                className="flex w-full items-center justify-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Dodaj dzień
              </Button>
            </div>
          </aside>

          <section className="max-w-xl w-full overflow-y-auto">
            <PlanAlerts
              planId={plan.id}
              hasModifications={hasModifications}
              className="mb-4"
            />
            <DayContainer
              day={selectedDay}
              onDetailsClick={placeDialog.handleDetailsClick}
              onRemovePlace={placeDialog.handleRemovePlace}
              onDeleteDay={
                editablePlan.days.length > 1
                  ? () => dayManagement.handleDeleteDayRequest(selectedDayIndex)
                  : undefined
              }
            />
          </section>

          <section className="flex max-h-[calc(100vh-100px)] min-w-80 flex-1 flex-col gap-8">
            <div className="flex items-center justify-end">{saveButton}</div>

            <PlanMapPanel
              mapCenter={mapCenter}
              mapMarkers={mapMarkers}
              onMarkerClick={placeDialog.handleMarkerClick}
              multiDay={editablePlan.days.length > 1}
              className="flex-1"
            />
          </section>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex items-start justify-between gap-3 px-4 pt-2">
            <PlanHeaderSection
              planId={plan.id}
              editablePlan={editablePlan}
              nameEditing={nameEditing}
              className="min-w-0 flex-1"
            />
            {saveButton}
          </div>

          <div className="px-4">
            <ExpandableCard title={selectedDayTitle} defaultOpen={false}>
              <DayTabs
                days={dayTabsData}
                selectedIndex={selectedDayIndex}
                onSelect={setSelectedDayIndex}
                dragOverDayIndex={dnd.dragOverDayIndex}
                className="p-0"
              />
              <Button
                outline
                onClick={dayManagement.handleAddDay}
                className="mt-3 flex w-full items-center justify-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Dodaj dzień
              </Button>
            </ExpandableCard>
          </div>

          <div className="px-4">
            <Tabs>
              <TabItem
                current={mobileViewTab === "plan"}
                onClick={() => setMobileViewTab("plan")}
              >
                Plan dnia
              </TabItem>
              <TabItem
                current={mobileViewTab === "map"}
                onClick={() => setMobileViewTab("map")}
              >
                Mapa
              </TabItem>
            </Tabs>
          </div>

          <div className="px-4">
            {mobileViewTab === "plan" ? (
              <>
                <PlanAlerts
                  planId={plan.id}
                  hasModifications={hasModifications}
                  className="mb-4"
                />
                <DayContainer
                  day={selectedDay}
                  onDetailsClick={placeDialog.handleDetailsClick}
                  onRemovePlace={placeDialog.handleRemovePlace}
                  onDeleteDay={
                    editablePlan.days.length > 1
                      ? () =>
                          dayManagement.handleDeleteDayRequest(selectedDayIndex)
                      : undefined
                  }
                />
              </>
            ) : (
              <PlanMapPanel
                mapCenter={mapCenter}
                mapMarkers={mapMarkers}
                onMarkerClick={placeDialog.handleMarkerClick}
                multiDay={editablePlan.days.length > 1}
                className="h-[55vh] min-h-[320px]"
              />
            )}
          </div>
        </div>
      )}

      <PlaceDetailsDialog
        place={placeDialog.placeForDialog}
        open={placeDialog.isDialogOpen}
        onClose={() => placeDialog.setIsDialogOpen(false)}
        showAddToPlan={!placeDialog.isSelectedPlaceInPlan}
        onAddToPlan={placeDialog.handleAddToPlan}
      />

      <Popup
        open={dayManagement.isPopupOpen}
        onClose={dayManagement.handleCancelDeleteDay}
        onConfirm={dayManagement.handleConfirmDeleteDay}
        title="Usunąć dzień z planu?"
        description={`Czy na pewno chcesz usunąć Dzień ${dayManagement.dayToDeleteIndex !== null ? dayManagement.dayToDeleteIndex + 1 : ""} z planu? Tej operacji nie można cofnąć.`}
        confirmText="Usuń"
        cancelText="Anuluj"
        variant="destructive"
      />

      <DragOverlay dropAnimation={dnd.dropAnimation}>
        {dnd.activeDrag ? (
          <PlaceCard place={dnd.activeDrag.place} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
