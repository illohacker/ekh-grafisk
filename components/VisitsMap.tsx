"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type VisitLocation = {
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  count: number;
};

export default function VisitsMap({ locations }: { locations: VisitLocation[] }) {
  const withCoords = locations.filter(
    (l) => l.latitude != null && l.longitude != null
  );
  const max = Math.max(...withCoords.map((l) => l.count), 1);

  return (
    <MapContainer
      center={[62.7372, 7.1607]}
      zoom={4}
      style={{ height: 420, width: "100%", borderRadius: 12 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {withCoords.map((loc, i) => {
        const radius = 6 + (loc.count / max) * 18;
        return (
          <CircleMarker
            key={`${loc.country}-${loc.city}-${i}`}
            center={[loc.latitude as number, loc.longitude as number]}
            radius={radius}
            pathOptions={{
              color: "#C2267A",
              fillColor: "#C2267A",
              fillOpacity: 0.55,
              weight: 2,
            }}
          >
            <Tooltip>
              <strong>{loc.city || "Ukjent by"}</strong>
              {loc.country ? ` (${loc.country})` : ""}
              <br />
              {loc.count} {loc.count === 1 ? "besøk" : "besøk"}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
