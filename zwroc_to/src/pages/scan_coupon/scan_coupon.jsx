import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CameraIcon } from "../../components/icons/icons";
import "./scan_coupon.css";

// Placeholder for the coupon scanner. Reached from the FAB "Dodaj kupon" action.
export default function ScanCoupon() {
  const navigate = useNavigate();

  return (
    <div className="scan-coupon">
      <button
        type="button"
        className="scan-coupon__back"
        onClick={() => navigate(-1)}
        aria-label="Wróć"
      >
        <ArrowLeftIcon size={24} />
      </button>

      <div className="scan-coupon__body">
        <span className="scan-coupon__frame">
          <CameraIcon size={56} />
        </span>
        <p className="scan-coupon__text">Tu będzie włączenie aparatu</p>
      </div>
    </div>
  );
}
