import { useState } from "react";
import {
  Dialog,
  DialogPanel,
} from "@/components/design-system/overlays/Dialog";

import { Button } from "@/components/design-system/atoms/Button";
import { HeartButton } from "@/components/design-system/atoms/icons";
import { H2 } from "@/components/design-system/typography/Heading";
import { P2, P3 } from "@/components/design-system/typography/Paragraph";
import {
  XMarkIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { Divider } from "../../design-system/atoms/Divider";
import { cn } from "../../utils";
import { GalleryDialog } from "./GalleryDialog";

export type Place = {
  title: string;
  description: string;
  img: string;
  images?: string[];
  category?: string;
  rating?: {
    score: number;
    reviews: number;
  };
  hours?: string;
  location?: string;
  price?: {
    normal: number;
    reduced: number;
    currency: string;
  };
};

type PlaceDetailsDialogProps = {
  place?: Place;
  open: boolean;
  showActions?: boolean;
  onClose: () => void;
};

export function PlaceDetailsDialog({
  place,
  open,
  onClose,
  showActions = true,
}: PlaceDetailsDialogProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);

  if (!open || !place) return null;

  const images = place.images || [place.img];
  const mainImage = images[selectedImageIndex] || place.img;

  const thumbnails = images.slice(0, 3);
  const remainingImages = Math.max(0, images.length - 3);

  const handleThumbnailClick = (idx: number) => {
    setSelectedImageIndex(idx);
  };

  const handleGalleryImageChange = (idx: number) => {
    setSelectedImageIndex(idx);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel className="max-w-4xl overflow-hidden p-0 w-full max-h-[90vh] overflow-y-auto">
        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-1/2 bg-backgroundPrimary p-6 flex flex-col gap-4">
            {/* Main Image */}
            <button
              onClick={() => setGalleryOpen(true)}
              className="relative w-full aspect-square rounded-xl overflow-hidden bg-backgroundTertiary flex items-center justify-center"
            >
              <img
                src={mainImage}
                alt={place.title}
                className="w-full h-full object-cover"
              />
            </button>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  className={cn(
                    "w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-colors",
                    selectedImageIndex === idx
                      ? "border-accentBase"
                      : "border-transparent",
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {remainingImages > 0 && (
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="w-16 h-16 rounded-xl bg-backgroundTertiary flex items-center justify-center shrink-0 text-contentTertiary font-semibold text-sm hover:brightness-105 transition-colors cursor-default"
                >
                  +{remainingImages}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-1/2 bg-white p-6 flex flex-col gap-4 relative">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <Button plain onClick={onClose} className="px-1 py-1">
                <XMarkIcon className="h-6 w-6 text-contentSecondary" />
              </Button>
            </div>

            {/* Category Badge */}
            {place.category && (
              <div className="inline-flex w-fit bg-accentLight px-3 py-1 rounded-full">
                <P3 className="font-semibold text-accentDark uppercase">
                  {place.category}
                </P3>
              </div>
            )}

            {/* Title */}
            <H2>{place.title}</H2>

            {/* Rating */}
            {place.rating && (
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-accentBase fill-accentBase" />
                <P3 className="font-semibold text-contentPrimary">
                  {place.rating.score}
                </P3>
                <P3 className="text-contentSecondary">
                  ({place.rating.reviews.toLocaleString()} opinii)
                </P3>
              </div>
            )}

            {/* Description */}
            <P2 className="text-contentSecondary">{place.description}</P2>

            {/* Details List */}
            <div className="space-y-4 mt-4">
              {/* Hours */}
              {place.hours && (
                <div className="flex gap-3">
                  <ClockIcon className="h-5 w-5 text-accentBase shrink-0 mt-0.5" />
                  <div>
                    <P3 className="font-semibold text-contentSecondary uppercase">
                      Godziny otwarcia
                    </P3>
                    <P3 className="text-contentPrimary">{place.hours}</P3>
                  </div>
                </div>
              )}

              {/* Location */}
              {place.location && (
                <div className="flex gap-3">
                  <MapPinIcon className="h-5 w-5 text-accentBase shrink-0 mt-0.5" />
                  <div>
                    <P3 className="font-semibold text-contentSecondary uppercase">
                      Lokalizacja
                    </P3>
                    <P3 className="text-contentPrimary">{place.location}</P3>
                  </div>
                </div>
              )}

              {/* Price */}
              {place.price && (
                <div className="flex gap-3">
                  <WalletIcon className="h-5 w-5 text-accentBase shrink-0 mt-0.5" />
                  <div>
                    <P3 className="font-semibold text-contentSecondary uppercase">
                      Bilety
                    </P3>
                    <P3 className="text-contentPrimary">
                      {place.price.normal} {place.price.currency} (normalny),{" "}
                      {place.price.reduced} {place.price.currency} (ulgowy)
                    </P3>
                  </div>
                </div>
              )}
            </div>

            {showActions ? (
              <Divider className="my-4" />
            ) : null}

            {/* Footer - Actions */}
            {showActions ? (
              <div className="flex gap-3 items-center">
              <Button className="flex-1">Dodaj do planu</Button>
              <HeartButton
                defaultLiked={isFavorite}
                onToggle={setIsFavorite}
                className="p-2"
              />
            </div>
            ) : null}
          </div>
        </div>
      </DialogPanel>

      {/* Gallery Dialog */}
      <GalleryDialog
        images={images}
        selectedImageIndex={selectedImageIndex}
        onImageChange={handleGalleryImageChange}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </Dialog>
  );
}
