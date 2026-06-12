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
  expanded,
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

      {expanded && (
        <>
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
            <button
              type="button"
              className="sheet-submit"
              onClick={onSubmitReview}
            >
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
        </>
      )}

      <button
        type="button"
        className="sheet-report-issue"
        onClick={onReportIssue}
      >
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

// Bottom sheet that surfaces the selected map pin. Machine pins get the
// collapsible detail sheet; packaging pins get the compact card.
export default function BottomSheet({
  selection,
  expanded,
  onToggleExpand,
  onClose,
  reviewState,
  onReportIssue,
}) {
  if (!selection) return null;

  const isMachine = selection.type === "machine";

  return (
    <div
      className={`bottom-sheet${expanded ? " bottom-sheet--expanded" : ""}${
        isMachine ? "" : " bottom-sheet--compact"
      }`}
    >
      {isMachine && (
        <button
          type="button"
          className="bottom-sheet__handle"
          onClick={onToggleExpand}
          aria-label={expanded ? "Zwiń" : "Rozwiń"}
        >
          <span className="bottom-sheet__grabber" />
        </button>
      )}

      <button
        type="button"
        className="bottom-sheet__close"
        onClick={onClose}
        aria-label="Zamknij"
      >
        ×
      </button>

      <div className="bottom-sheet__content">
        {isMachine ? (
          <MachineSheet
            machine={selection.data}
            expanded={expanded}
            userRating={reviewState.rating}
            onRateChange={reviewState.setRating}
            comment={reviewState.comment}
            onCommentChange={reviewState.setComment}
            onSubmitReview={reviewState.submit}
            onReportIssue={onReportIssue}
          />
        ) : (
          <PackagingSheet report={selection.data} />
        )}
      </div>
    </div>
  );
}
