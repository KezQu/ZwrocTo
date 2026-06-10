import { useState } from "react";
import ModalSheet from "../modal_sheet/modal_sheet";
import Chip from "../chip/chip";
import { BottleIcon, PinIcon } from "../icons/icons";
import { packagingIcon } from "../icons/type_icons";
import { PACKAGING_TYPES } from "../../data/mock";

// "Zgłoś opakowania" modal (prototype screen 8). Single packaging type plus a
// quantity field. Local state only; submit reports the payload (mock).
export default function ReportPackagingForm({ onClose, onSubmit }) {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("plastik");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    onSubmit({ address, type, quantity });
    onClose();
  };

  return (
    <ModalSheet
      icon={<BottleIcon size={24} />}
      title="Zgłoś opakowania"
      onClose={onClose}
    >
      <label className="report-form__label">Adres</label>
      <div className="report-form__input-wrap">
        <input
          className="report-form__input"
          placeholder="Wpisz adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <span className="report-form__input-icon">
          <PinIcon size={20} />
        </span>
      </div>

      <label className="report-form__label">Rodzaj opakowania</label>
      <div className="report-form__chips">
        {PACKAGING_TYPES.map((t) => (
          <Chip
            key={t.id}
            icon={packagingIcon(t.id, { size: 16 })}
            label={t.label}
            selected={type === t.id}
            onClick={() => setType(t.id)}
          />
        ))}
      </div>

      <label className="report-form__label">Ilość</label>
      <div className="report-form__input-wrap">
        <input
          className="report-form__input"
          placeholder="Wpisz ilość"
          inputMode="numeric"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="report-form__footer">
        <button
          type="button"
          className="report-form__submit"
          onClick={handleSubmit}
        >
          Dodaj
        </button>
      </div>
    </ModalSheet>
  );
}
