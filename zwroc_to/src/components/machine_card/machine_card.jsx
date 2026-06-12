import StarRating from "../star_rating/star_rating";
import Chip from "../chip/chip";
import { RouteIcon } from "../icons/icons";
import { packagingIcon } from "../icons/type_icons";
import { PACKAGING_TYPES } from "../../data/mock";
import "./machine_card.css";

const PACKAGING_LABELS = Object.fromEntries(
  PACKAGING_TYPES.map((t) => [t.id, t.label])
);

// Summary card for one machine, used in the machines list. Mirrors the
// collapsed machine sheet styling for visual consistency.
export default function MachineCard({ machine, onClick }) {
  return (
    <button type="button" className="machine-card" onClick={onClick}>
      <div className="machine-card__top">
        <span
          className={`machine-card__status${
            machine.active ? "" : " machine-card__status--off"
          }`}
        >
          <span className="machine-card__dot" />
          {machine.active ? "AKTYWNY" : "NIEAKTYWNY"}
        </span>
        <span className="machine-card__rating">
          <StarRating value={1} max={1} size={14} />
          {machine.rating.toFixed(1)}
        </span>
      </div>

      {!machine.active && machine.inactiveReason && (
        <p className="machine-card__inactive">
          <span className="machine-card__inactive-reason">
            {machine.inactiveReason}
          </span>
          {machine.inactiveSince ? ` · ${machine.inactiveSince}` : ""}
        </p>
      )}

      <h3 className="machine-card__name">{machine.name}</h3>
      <p className="machine-card__address">{machine.address}</p>

      <div className="machine-card__chips">
        {machine.packaging.map((id) => (
          <Chip
            key={id}
            icon={packagingIcon(id, { size: 14 })}
            label={PACKAGING_LABELS[id]}
          />
        ))}
      </div>

      <div className="machine-card__footer">
        <span className="machine-card__distance">{machine.distance}</span>
        <span className="machine-card__cta">
          <RouteIcon size={14} />
          Pokaż na mapie
        </span>
      </div>
    </button>
  );
}
