import { useState } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";
import ModalSheet from "../modal_sheet/modal_sheet";
import Chip from "../chip/chip";
import { RobotIcon, PinIcon } from "../icons/icons";
import { packagingIcon, returnFormIcon } from "../icons/type_icons";
import { PACKAGING_TYPES, RETURN_FORMS } from "../../data/mock";

// "Dodaj automat" modal (prototype screen 7). Local form state only; submit
// reports the payload (mock — no backend yet) and closes.
export default function AddMachineForm({ onClose, onSubmit }) {
  const [address, setAddress] = useState("");
  const [packaging, setPackaging] = useState(["plastik"]);
  const [returnForms, setReturnForms] = useState(["kupon"]);

  const toggle = (list, setList, id) =>
    setList(
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );

  const handleSubmit = () => {
    onSubmit({ address, packaging, returnForms });
    logEvent(analytics, "add_machine", { packaging_types: packaging.join(","), return_forms: returnForms.join(",") });
    onClose();
  };

  return (
    <ModalSheet
      icon={<RobotIcon size={24} />}
      title="Dodaj automat"
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

      <label className="report-form__label">Przyjmuje opakowania</label>
      <div className="report-form__chips">
        {PACKAGING_TYPES.map((t) => (
          <Chip
            key={t.id}
            icon={packagingIcon(t.id, { size: 16 })}
            label={t.label}
            selected={packaging.includes(t.id)}
            onClick={() => toggle(packaging, setPackaging, t.id)}
          />
        ))}
      </div>

      <label className="report-form__label">Formy zwrotu</label>
      <div className="report-form__chips">
        {RETURN_FORMS.map((t) => (
          <Chip
            key={t.id}
            icon={returnFormIcon(t.id, { size: 16 })}
            label={t.label}
            selected={returnForms.includes(t.id)}
            onClick={() => toggle(returnForms, setReturnForms, t.id)}
          />
        ))}
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
