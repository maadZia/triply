import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@/components/design-system/overlays/Dialog";

import { Button } from "@/components/design-system/atoms/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

export type Place = {
  title: string;
  description: string;
  img: string;
};

type PlaceDetailsDialogProps = {
  place?: Place;
  open: boolean;
  onClose: () => void;
};

export function PlaceDetailsDialog({
  place,
  open,
  onClose,
}: PlaceDetailsDialogProps) {
  if (!open || !place) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel className="max-w-3xl overflow-hidden p-0">
        <div className="flex flex-row-reverse gap-4">
          <section className="flex-2 bg-white p-6">
            <DialogTitle className="flex items-baseline justify-between text-2xl">
              {place.title}

              <Button plain onClick={onClose} className="px-0">
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </DialogTitle>

            <DialogDescription>{place.description}</DialogDescription>
          </section>

          <div className="flex-1 p-6" />
        </div>
      </DialogPanel>
    </Dialog>
  );
}
