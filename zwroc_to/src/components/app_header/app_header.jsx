import { Link } from "react-router-dom";
import { UserIcon } from "../icons/icons";
import "./app_header.css";

// Top bar shared across the map screen: wordmark on the left, profile avatar
// (links to /profile) on the right.
export default function AppHeader() {
  return (
    <header className="app-header">
      <span className="app-header__wordmark">
        Zwróć<span className="app-header__wordmark-accent">To</span>
      </span>
      <Link to="/profile" className="app-header__avatar" aria-label="Profil">
        <UserIcon size={22} />
      </Link>
    </header>
  );
}
