"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// zielona ikona dla wybranych miejsc w planie
const selectedIcon = L.divIcon({
  className: "custom-selected-marker",
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
      <defs>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#88b77e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4d8b43;stop-opacity:1" />
        </linearGradient>
      </defs>
      <path fill="url(#greenGradient)" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.333 12.5 28.5 12.5 28.5S25 21.833 25 12.5C25 5.596 19.404 0 12.5 0z"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>
  `,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

export interface MapMarker {
  id: number | string;
  lat: number;
  lng: number;
  label?: string;
  selected?: boolean;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
}

export function Map({
  center,
  zoom = 13,
  markers = [],
  onMarkerClick,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      className="isolate"
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
      />

      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={m.selected ? selectedIcon : defaultIcon}
          eventHandlers={
            onMarkerClick
              ? {
                  click: () => onMarkerClick(m),
                }
              : undefined
          }
        >
          {m.label && (
            <Popup>
              <span className="text-sm font-medium">{m.label}</span>
              {m.selected && (
                <span className="ml-2 text-xs text-accentBase font-semibold">
                  (w planie)
                </span>
              )}
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
