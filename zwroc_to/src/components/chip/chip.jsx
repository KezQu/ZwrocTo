import "./chip.css";

// A pill chip with an optional leading icon. When `selected` is true it fills
// with dark green (used in the report forms). When `onClick` is omitted the
// chip is a static label (used in the read-only machine sheet).
export default function Chip({ icon, label, selected = false, onClick }) {
  const className = `chip${selected ? " chip--selected" : ""}${
    onClick ? " chip--button" : ""
  }`;

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {icon && <span className="chip__icon">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span className={className}>
      {icon && <span className="chip__icon">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
