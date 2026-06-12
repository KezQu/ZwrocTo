import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { RobotIcon, BottleIcon } from "../icons/icons";
import { WADOWICE_CENTER } from "../../data/mock";
import "./return_map.css";

// Build a Leaflet divIcon rendering a coloured pin badge with an inline SVG.
// `selected` adds the highlight class (different colour + pop/pulse animation).
function makeIcon(variant, IconComponent, selected) {
  const html = renderToStaticMarkup(
    <div
      className={`map-pin map-pin--${variant}${
        selected ? " map-pin--selected" : ""
      }`}
    >
      <span className="map-pin__icon">
        <IconComponent size={20} />
      </span>
    </div>
  );
  return L.divIcon({
    html,
    className: "map-pin-wrapper",
    iconSize: [44, 52],
    iconAnchor: [22, 50],
  });
}

// Cache icons so we don't rebuild them on every render.
const iconCache = {};
function getIcon(variant, IconComponent, selected) {
  const key = `${variant}-${selected ? "sel" : "def"}`;
  if (!iconCache[key]) {
    iconCache[key] = makeIcon(variant, IconComponent, selected);
  }
  return iconCache[key];
}

// Clears the current selection when the user clicks empty map (not a marker).
function MapClickHandler({ onDeselect }) {
  useMapEvents({
    click: () => onDeselect && onDeselect(),
  });
  return null;
}

export default function ReturnMap({
  machines = [],
  packagingReports = [],
  center = WADOWICE_CENTER,
  selectedType,
  selectedId,
  onSelectMachine,
  onSelectPackaging,
  onDeselect,
}) {
  return (
    <MapContainer
      center={center}
      zoom={16}
      zoomControl={false}
      className="return-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onDeselect={onDeselect} />

      {machines.map((m) => {
        const selected = selectedType === "machine" && selectedId === m.id;
        const variant = m.active ? "active" : "inactive";
        return (
          <Marker
            key={m.id}
            position={m.coords}
            icon={getIcon(variant, RobotIcon, selected)}
            zIndexOffset={selected ? 1000 : 0}
            eventHandlers={{
              click: () => onSelectMachine && onSelectMachine(m),
            }}
          />
        );
      })}

      {packagingReports.map((p) => {
        const selected = selectedType === "packaging" && selectedId === p.id;
        return (
          <Marker
            key={p.id}
            position={p.coords}
            icon={getIcon("packaging", BottleIcon, selected)}
            zIndexOffset={selected ? 1000 : 0}
            eventHandlers={{
              click: () => onSelectPackaging && onSelectPackaging(p),
            }}
          />
        );
      })}
    </MapContainer>
  );
}
