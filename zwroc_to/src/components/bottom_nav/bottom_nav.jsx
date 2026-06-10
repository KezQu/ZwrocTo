import { Link, useLocation } from "react-router-dom";
import { MapIcon, RobotIcon, WalletIcon, TrophyIcon } from "../icons/icons";
import "./bottom_nav.css";

const TABS = [
  { id: "mapa", label: "MAPA", Icon: MapIcon, path: "/map" },
  { id: "automaty", label: "AUTOMATY", Icon: RobotIcon, path: "/automaty" },
  { id: "portfel", label: "PORTFEL", Icon: WalletIcon, path: "/portfel" },
  { id: "nagrody", label: "NAGRODY", Icon: TrophyIcon, path: "/nagrody" },
];

// Bottom tab bar. Each tab is a React Router link; the active tab is derived
// from the current location and highlighted with a pill.
export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon, path }) => (
        <Link
          key={id}
          to={path}
          className={`bottom-nav__tab${
            pathname === path ? " bottom-nav__tab--active" : ""
          }`}
        >
          <span className="bottom-nav__icon">
            <Icon size={22} />
          </span>
          <span className="bottom-nav__label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
