import { PlusIcon, CouponIcon, RobotIcon, BottleIcon } from "../icons/icons";
import "./fab.css";

// Floating action button. Collapsed it is a single "+"; expanded it reveals the
// three actions from the prototype. The parent owns the open state so it can
// also dim the map behind it.
export default function Fab({
  open,
  onToggle,
  onAddCoupon,
  onAddMachine,
  onReportPackaging,
  bottom,
}) {
  return (
    <div
      className={`fab${open ? " fab--open" : ""}`}
      style={bottom != null ? { bottom } : undefined}
    >
      <div className="fab__actions">
        <button type="button" className="fab__action" onClick={onAddCoupon}>
          <CouponIcon size={20} />
          <span>Dodaj kupon</span>
        </button>
        <button type="button" className="fab__action" onClick={onAddMachine}>
          <RobotIcon size={20} />
          <span>Dodaj automat</span>
        </button>
        <button
          type="button"
          className="fab__action"
          onClick={onReportPackaging}
        >
          <BottleIcon size={20} />
          <span>Zgłoś opakowania</span>
        </button>
      </div>

      <button
        type="button"
        className="fab__toggle"
        onClick={onToggle}
        aria-label={open ? "Zamknij menu" : "Dodaj"}
      >
        <PlusIcon size={26} />
      </button>
    </div>
  );
}
