import { forwardRef, useRef, useState } from "react";
import Chip from "../chip/chip";
import StarRating from "../star_rating/star_rating";
import { RouteIcon, RecycleIcon, UserIcon, AlertIcon } from "../icons/icons";
import { packagingIcon, returnFormIcon } from "../icons/type_icons";
import { PACKAGING_TYPES, RETURN_FORMS } from "../../data/mock";
import "./bottom_sheet.css";

const PACKAGING_LABELS = Object.fromEntries(
  PACKAGING_TYPES.map((t) => [t.id, t.label])
);
const RETURN_LABELS = Object.fromEntries(
  RETURN_FORMS.map((t) => [t.id, t.label])
);

// Height (px) of the sheet that stays visible when collapsed (the "peek").
const PEEK = 220;

function RouteButton() {
  return (
    <button type="button" className="sheet-route-btn">
      <RouteIcon size={16} />
      <span>Trasa</span>
    </button>
  );
}

function MachineSheet({
  machine,
  userRating,
  onRateChange,
  comment,
  onCommentChange,
  onSubmitReview,
  onReportIssue,
}) {
  return (
    <>
      <div className="sheet-header">
        <div className="sheet-header__left">
          <span
            className={`sheet-status${
              machine.active ? "" : " sheet-status--off"
            }`}
          >
            <span className="sheet-status__dot" />
            {machine.active ? "AKTYWNY" : "NIEAKTYWNY"}
          </span>

          {!machine.active && machine.inactiveReason && (
            <p className="sheet-inactive">
              <span className="sheet-inactive__reason">
                {machine.inactiveReason}
              </span>
              {machine.inactiveSince ? ` · ${machine.inactiveSince}` : ""}
            </p>
          )}

          <h2 className="sheet-title">{machine.name}</h2>
          <p className="sheet-subtitle">{machine.address}</p>
        </div>

        <div className="sheet-header__right">
          <span className="sheet-rating">
            <StarRating value={1} max={1} size={15} />
            {machine.rating.toFixed(1)}
          </span>
          <span className="sheet-distance">{machine.distance}</span>
          <RouteButton />
        </div>
      </div>

      <div className="sheet-section">
        <p className="sheet-label">Przyjmuje opakowania</p>
        <div className="sheet-chips">
          {machine.packaging.map((id) => (
            <Chip
              key={id}
              icon={packagingIcon(id, { size: 16 })}
              label={PACKAGING_LABELS[id]}
            />
          ))}
        </div>
      </div>

      <div className="sheet-section">
        <p className="sheet-label">Formy zwrotu</p>
        <div className="sheet-chips">
          {machine.returnForms.map((id) => (
            <Chip
              key={id}
              icon={returnFormIcon(id, { size: 16 })}
              label={RETURN_LABELS[id]}
            />
          ))}
        </div>
      </div>

      <div className="sheet-section">
        <p className="sheet-label sheet-label--strong">Lokalizacja:</p>
        <p className="sheet-text">{machine.location.address}</p>
        <p className="sheet-text sheet-text--muted">{machine.location.hint}</p>
      </div>

      <div className="sheet-hours">
        <p className="sheet-hours__title">Godziny otwarcia</p>
        {machine.hours.map((h) => (
          <div key={h.days} className="sheet-hours__row">
            <span>{h.days}</span>
            <span className="sheet-hours__time">{h.time}</span>
          </div>
        ))}
      </div>

      <div className="sheet-section sheet-rate">
        <p className="sheet-rate__title">Twoja ocena automatu</p>
        <StarRating value={userRating} onChange={onRateChange} size={28} />
      </div>

      <div className="sheet-section">
        <p className="sheet-label sheet-label--strong">Zostaw komentarz</p>
        <textarea
          className="sheet-textarea"
          placeholder="Napisz co sądzisz o tym automacie..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <button type="button" className="sheet-submit" onClick={onSubmitReview}>
          <RouteIcon size={16} />
          <span>Dodaj opinię</span>
        </button>
      </div>

      {machine.reviews.length > 0 && (
        <div className="sheet-reviews">
          {machine.reviews.map((r) => (
            <div key={r.id} className="sheet-review">
              <div className="sheet-review__head">
                <span className="sheet-review__avatar">
                  <UserIcon size={18} />
                </span>
                <span className="sheet-review__author">{r.author}</span>
                <span className="sheet-review__when">{r.when}</span>
              </div>
              <StarRating value={r.rating} size={14} />
              <p className="sheet-review__text">{r.text}</p>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="sheet-report-issue" onClick={onReportIssue}>
        <AlertIcon size={16} />
        <span>Zgłoś awarię automatu</span>
      </button>
    </>
  );
}

function PackagingSheet({ report }) {
  return (
    <div className="sheet-row sheet-packaging">
      <span className="sheet-packaging__icon">
        <RecycleIcon size={24} />
      </span>
      <div className="sheet-packaging__info">
        <p className="sheet-packaging__title">{report.title}</p>
        <p className="sheet-packaging__distance">
          <RouteIcon size={13} /> {report.distance}
        </p>
      </div>
      <RouteButton />
    </div>
  );
}

// Bottom sheet for the selected map pin. Machine pins get a draggable detail
// sheet (peek -> drag up to expand); packaging pins get the compact card.
const BottomSheet = forwardRef(function BottomSheet(
  { selection, expanded, onExpandedChange, onClose, reviewState, onReportIssue },
  ref
) {
  const innerRef = useRef(null);
  const drag = useRef(null);
  const [dragY, setDragY] = useState(null);

  const setRefs = (el) => {
    innerRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  if (!selection) return null;

  const isMachine = selection.type === "machine";

  if (!isMachine) {
    return (
      <div ref={setRefs} className="bottom-sheet bottom-sheet--compact">
        <button
          type="button"
          className="bottom-sheet__close"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ×
        </button>
        <div className="bottom-sheet__content">
          <PackagingSheet report={selection.data} />
        </div>
      </div>
    );
  }

  const onPointerDown = (e) => {
    const el = innerRef.current;
    if (!el) return;
    drag.current = {
      startY: e.clientY,
      height: el.offsetHeight,
      base: expanded ? 0 : el.offsetHeight - PEEK,
      moved: 0,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = e.clientY - d.startY;
    d.moved = dy;
    const collapsedY = d.height - PEEK;
    setDragY(Math.max(0, Math.min(collapsedY + 110, d.base + dy)));
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragY(null);
    if (!d) return;
    const collapsedY = d.height - PEEK;
    if (Math.abs(d.moved) < 6) {
      onExpandedChange(!expanded); // treat as a tap
      return;
    }
    const final = d.base + d.moved;
    if (final > collapsedY + 60) onClose();
    else if (final < collapsedY * 0.55) onExpandedChange(true);
    else onExpandedChange(false);
  };

  return (
    <div
      ref={setRefs}
      className={`bottom-sheet bottom-sheet--machine${
        expanded ? " bottom-sheet--expanded" : ""
      }${dragY != null ? " bottom-sheet--dragging" : ""}`}
      style={dragY != null ? { transform: `translateY(${dragY}px)` } : undefined}
    >
      <div
        className="bottom-sheet__bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <span className="bottom-sheet__grabber" />
      </div>

      <button
        type="button"
        className="bottom-sheet__close"
        onClick={onClose}
        aria-label="Zamknij"
      >
        ×
      </button>

      <div className="bottom-sheet__content">
        <MachineSheet
          machine={selection.data}
          userRating={reviewState.rating}
          onRateChange={reviewState.setRating}
          comment={reviewState.comment}
          onCommentChange={reviewState.setComment}
          onSubmitReview={reviewState.submit}
          onReportIssue={onReportIssue}
        />
      </div>
    </div>
  );
});

export default BottomSheet;
