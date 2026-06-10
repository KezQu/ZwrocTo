import "./modal_sheet.css";

// Base modal: dimmed backdrop + white rounded card with a title row. Used by the
// "Dodaj automat" and "Zgłoś opakowania" forms.
export default function ModalSheet({ icon, title, onClose, children }) {
  return (
    <div className="modal-sheet" onClick={onClose}>
      <div className="modal-sheet__card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sheet__head">
          <h2 className="modal-sheet__title">
            {icon && <span className="modal-sheet__icon">{icon}</span>}
            {title}
          </h2>
          <button
            type="button"
            className="modal-sheet__close"
            onClick={onClose}
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
