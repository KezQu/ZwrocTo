import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/app_header/app_header";
import BottomNav from "../../components/bottom_nav/bottom_nav";
import MachineCard from "../../components/machine_card/machine_card";
import Chip from "../../components/chip/chip";
import { machines } from "../../data/mock";
import "./machines_list.css";

const FILTERS = [
  { id: "all", label: "Wszystkie" },
  { id: "active", label: "Aktywne" },
  { id: "inactive", label: "Nieaktywne" },
];

// List of machines, reached from the "Automaty" tab. Tapping a card opens the
// map with that machine selected.
export default function MachinesList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const visible = machines.filter((m) =>
    filter === "all" ? true : filter === "active" ? m.active : !m.active
  );

  return (
    <div className="machines-list">
      <AppHeader />

      <div className="machines-list__body">
        <div className="machines-list__head">
          <h1 className="machines-list__title">Automaty</h1>
          <p className="machines-list__count">{visible.length} w pobliżu</p>
        </div>

        <div className="machines-list__filters">
          {FILTERS.map((f) => (
            <Chip
              key={f.id}
              label={f.label}
              selected={filter === f.id}
              onClick={() => setFilter(f.id)}
            />
          ))}
        </div>

        <div className="machines-list__items">
          {visible.map((m) => (
            <MachineCard
              key={m.id}
              machine={m}
              onClick={() => navigate("/map", { state: { machineId: m.id } })}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
