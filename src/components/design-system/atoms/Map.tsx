"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const availableIcon = L.divIcon({
  className: "map-marker map-marker--available",
  html: `
    <div class="map-marker__dot"></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -12],
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createSelectedIcon(markerLabel?: string): L.DivIcon {
  const labelHtml = markerLabel
    ? `<span class="map-marker-selected__label" style="font-size:8px">${escapeHtml(markerLabel)}</span>`
    : "";

  return L.divIcon({
    className: "map-marker map-marker--selected",
    html: `
      <div class="map-marker-selected">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41" aria-hidden="true">
          <path fill="#ef4444" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.333 12.5 28.5 12.5 28.5S25 21.833 25 12.5C25 5.596 19.404 0 12.5 0z"/>
          <path fill="#dc2626" d="M12.5 2C6.701 2 2 6.701 2 12.5c0 7.8 10.5 24.5 10.5 24.5S23 20.3 23 12.5C23 6.701 18.299 2 12.5 2z"/>
          <circle cx="12.5" cy="12.5" r="5" fill="white"/>
        </svg>
        ${labelHtml}
      </div>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

const selectedIconCache = new globalThis.Map<string, L.DivIcon>();

function getSelectedIcon(markerLabel?: string): L.DivIcon {
  const key = markerLabel ?? "";
  if (!selectedIconCache.has(key)) {
    selectedIconCache.set(key, createSelectedIcon(markerLabel));
  }
  return selectedIconCache.get(key)!;
}

export interface MapMarker {
  id: number | string;
  lat: number;
  lng: number;
  label?: string;
  selected?: boolean;
  markerLabel?: string;
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
          icon={m.selected ? getSelectedIcon(m.markerLabel) : availableIcon}
          zIndexOffset={m.selected ? 1000 : 0}
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
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
