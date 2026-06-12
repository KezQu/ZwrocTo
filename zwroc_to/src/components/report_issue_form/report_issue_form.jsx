import { useState } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";
import ModalSheet from "../modal_sheet/modal_sheet";
import { AlertIcon } from "../icons/icons";

// "Zgłoś awarię" modal, opened from the machine sheet. Lets the user describe
// the malfunction for the selected machine. Local state only (mock).
export default function ReportIssueForm({ 
  machine, 
  onClose, 
  onSubmit,
  title = "Zgłoś awarię",
  label = "Opis usterki",
  placeholder = "Opisz co nie działa...",
  showIcon = true,
  showMachineInfo = true,
}) {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit({ machineId: machine?.id, description });
    logEvent(analytics, "report_issue", { machine_id: machine?.id });
    onClose();
  };

  return (
    <ModalSheet
      icon={showIcon ? <AlertIcon size={24} /> : null}
      title={title}
      onClose={onClose}
    >
      {showMachineInfo && machine && (
        <p className="report-form__machine">
          {machine.name}, {machine.address}
        </p>
      )}

      <label className="report-form__label">{label}</label>
      <textarea
        className="report-form__textarea"
        placeholder={placeholder}
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
