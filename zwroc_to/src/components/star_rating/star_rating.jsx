import { StarIcon } from "../icons/icons";
import "./star_rating.css";

// Star rating. In display mode it renders `value` filled stars. When `onChange`
// is provided the stars become interactive (user's own rating).
export default function StarRating({
  value = 0,
  max = 5,
  size = 22,
  onChange,
}) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={`star-rating${onChange ? " star-rating--interactive" : ""}`}>
      {stars.map((star) => {
        const filled = star <= value;
        if (onChange) {
          return (
            <button
              key={star}
              type="button"
              className="star-rating__btn"
              aria-label={`Oceń na ${star}`}
              onClick={() => onChange(star)}
            >
              <StarIcon size={size} filled={filled} />
            </button>
          );
        }
        return <StarIcon key={star} size={size} filled={filled} />;
      })}
    </div>
  );
}
