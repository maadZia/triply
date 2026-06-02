import {
  Dialog,
  DialogPanel,
} from "@/components/design-system/overlays/Dialog";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { cn } from "../../utils";

type GalleryDialogProps = {
  images: string[];
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  open: boolean;
  onClose: () => void;
};

export function GalleryDialog({
  images,
  selectedImageIndex,
  onImageChange,
  open,
  onClose,
}: GalleryDialogProps) {
  const handlePrev = () => {
    onImageChange(
      selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1,
    );
  };

  const handleNext = () => {
    onImageChange(
      selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1,
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel className="w-full max-w-5xl overflow-hidden border-transparent bg-neutral-950 p-0">
        <div className="relative">
          {/* Main image */}
          <div className="relative aspect-16/10 w-full overflow-hidden ">
            <img
              src={images[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="h-full w-full object-cover transition-all duration-300"
            />

            {/* gradient overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/60 to-transparent" />

            {/* counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
              {selectedImageIndex + 1} / {images.length}
            </div>

            {/* close */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition hover:bg-black/70"
              aria-label="Close gallery"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* prev */}
            <button
              onClick={handlePrev}
              className="absolute left-5 top-1/2  rounded-full bg-black/50 p-3 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {/* next */}
            <button
              onClick={handleNext}
              className="absolute right-5 top-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-md transition hover:scale-105 hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* thumbnails */}
          <div className="flex gap-3 overflow-x-auto border-t border-white/10  px-5 py-4">
            {images.map((img, idx) => {
              const active = selectedImageIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => onImageChange(idx)}
                  className={cn(
                    "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border transition-all duration-200",
                    active ? " border-white/50" : "border-transparent ",
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={cn(
                      "h-full w-full object-cover transition duration-200",
                      active
                        ? "brightness-100"
                        : "brightness-50 hover:brightness-75",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
