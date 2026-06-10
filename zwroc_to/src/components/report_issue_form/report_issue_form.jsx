import { useState } from "react";
import ModalSheet from "../modal_sheet/modal_sheet";
import { AlertIcon } from "../icons/icons";

// "Zgłoś awarię" modal, opened from the machine sheet. Lets the user describe
// the malfunction for the selected machine. Local state only (mock).
export default function ReportIssueForm({ machine, onClose, onSubmit }) {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ machineId: machine?.id, description });
    onClose();
  };

  return (
    <ModalSheet
      icon={<AlertIcon size={24} />}
      title="Zgłoś awarię"
      onClose={onClose}
    >
      {machine && (
        <p className="report-form__machine">
          {machine.name}, {machine.address}
        </p>
      )}

      <label className="report-form__label">Opis usterki</label>
      <textarea
        className="report-form__textarea"
        placeholder="Opisz co nie działa..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="report-form__footer">
        <button
          type="button"
          className="report-form__submit"
          onClick={handleSubmit}
        >
          Wyślij
        </button>
      </div>
    </ModalSheet>
  );
}
