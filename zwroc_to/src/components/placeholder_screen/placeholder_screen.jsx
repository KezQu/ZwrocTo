import AppHeader from "../app_header/app_header";
import BottomNav from "../bottom_nav/bottom_nav";
import "./placeholder_screen.css";

// Shared shell for screens that aren't built out yet (Portfel, Nagrody).
// Keeps the app header + bottom navigation so the user can navigate away.
export default function PlaceholderScreen({ icon, title, subtitle }) {
  return (
    <div className="placeholder-screen">
      <AppHeader />
      <div className="placeholder-screen__body">
        {icon && <span className="placeholder-screen__icon">{icon}</span>}
        <h1 className="placeholder-screen__title">{title}</h1>
        {subtitle && <p className="placeholder-screen__subtitle">{subtitle}</p>}
      </div>
      <BottomNav />
    </div>
  );
}
