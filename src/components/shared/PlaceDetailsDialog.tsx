import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@/components/design-system/overlays/Dialog";

import { Button } from "@/components/design-system/atoms/Button";

export type Place = {
  title: string;
  description: string;
  img: string;
};

type PlaceDetailsDialogProps = {
  place: Place | null;
  open: boolean;
  onClose: () => void;
};

export function PlaceDetailsDialog({
  place,
  open,
  onClose,
}: PlaceDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel className="max-w-2xl overflow-hidden p-0">
        {place && (
          <>
            <img
              src={place.img}
              alt={place.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <DialogTitle>{place.title}</DialogTitle>

              <DialogDescription>{place.description}</DialogDescription>

              <div className="mt-6 flex justify-end">
                <Button onClick={onClose}>Zamknij</Button>
              </div>
            </div>
          </>
        )}
      </DialogPanel>
    </Dialog>
  );
}
