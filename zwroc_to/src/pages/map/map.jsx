import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";
import AppHeader from "../../components/app_header/app_header";
import BottomNav from "../../components/bottom_nav/bottom_nav";
import ReturnMap from "../../components/return_map/return_map";
import BottomSheet from "../../components/bottom_sheet/bottom_sheet";
import Fab from "../../components/fab/fab";
import AddMachineForm from "../../components/add_machine_form/add_machine_form";
import ReportPackagingForm from "../../components/report_packaging_form/report_packaging_form";
import ReportIssueForm from "../../components/report_issue_form/report_issue_form";
import { machines, packagingReports } from "../../data/mock";
import "./map.css";

export default function MapScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  // Allow opening the map on a specific machine (e.g. from the machines list);
  // otherwise start on the first one so the screen looks populated.
  const initialMachine =
    machines.find((m) => m.id === location.state?.machineId) || machines[0];

  // Selected map pin -> drives the bottom sheet.
  const [selection, setSelection] = useState({
    type: "machine",
    data: initialMachine,
  });
  const [mapCenter] = useState(initialMachine.coords);
  const [expanded, setExpanded] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [modal, setModal] = useState(null); // null | 'machine' | 'packaging' | 'issue'

  // User review form state for the expanded machine sheet.
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const selectMachine = (m) => {
    setSelection({ type: "machine", data: m });
    setExpanded(false);
    setFabOpen(false);
    setRating(0);
    setComment("");
    logEvent(analytics, "select_machine", { machine_id: m.id, machine_name: m.name });
  };

  const selectPackaging = (p) => {
    setSelection({ type: "packaging", data: p });
    setFabOpen(false);
  };

  const submitReview = () => {
    console.log("Nowa opinia:", {
      machine: selection.data.id,
      rating,
      comment,
    });
    logEvent(analytics, "submit_review", { machine_id: selection.data.id, rating });
    setRating(0);
    setComment("");
  };

  const openModal = (which) => {
    setModal(which);
    setFabOpen(false);
    logEvent(analytics, "open_modal", { modal: which });
  };

  const isMachineSheet = selection?.type === "machine";
  // Hide the FAB while reviewing an expanded machine sheet; otherwise float it
  // just above the visible sheet/card.
  const showFab = !(isMachineSheet && expanded);
  const fabVariant = isMachineSheet ? "high" : "mid";

  return (
    <div className="map-screen">
      <AppHeader />

      <div className="map-screen__map">
        <ReturnMap
          machines={machines}
          packagingReports={packagingReports}
          center={mapCenter}
          selectedType={selection?.type}
          selectedId={selection?.data?.id}
          onSelectMachine={selectMachine}
          onSelectPackaging={selectPackaging}
        />
      </div>

      {fabOpen && (
        <div className="map-screen__scrim" onClick={() => setFabOpen(false)} />
      )}

      <BottomSheet
        selection={selection}
        expanded={expanded}
        onToggleExpand={() => setExpanded((v) => !v)}
        onClose={() => setSelection(null)}
        reviewState={{
          rating,
          setRating,
          comment,
          setComment,
          submit: submitReview,
        }}
        onReportIssue={() => openModal("issue")}
      />

      {showFab && (
        <Fab
          open={fabOpen}
          variant={fabVariant}
          onToggle={() => setFabOpen((v) => !v)}
          onAddCoupon={() => {
            setFabOpen(false);
            navigate("/skanuj-kupon");
          }}
          onAddMachine={() => openModal("machine")}
          onReportPackaging={() => openModal("packaging")}
        />
      )}

      <BottomNav />

      {modal === "machine" && (
        <AddMachineForm
          onClose={() => setModal(null)}
          onSubmit={(payload) => console.log("Nowy automat:", payload)}
        />
      )}
      {modal === "packaging" && (
        <ReportPackagingForm
          onClose={() => setModal(null)}
          onSubmit={(payload) => console.log("Zgłoszone opakowania:", payload)}
        />
      )}
      {modal === "issue" && (
        <ReportIssueForm
          machine={isMachineSheet ? selection.data : null}
          onClose={() => setModal(null)}
          onSubmit={(payload) => console.log("Zgłoszona awaria:", payload)}
        />
      )}
    </div>
  );
}
