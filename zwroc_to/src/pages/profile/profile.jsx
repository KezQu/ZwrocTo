import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  FiBell,
  FiShield,
  FiKey,
  FiGlobe,
  FiMoon,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";

import AppHeader from "../../components/app_header/app_header";
import BottomNav from "../../components/bottom_nav/bottom_nav";
import "./profile.css";

function UserInfo({ user }) {
  const display = user.displayName || user.email;

  return (
    <div className="user-info">
      <div className="user-avatar"></div>

      <h1>Czesc, {display}!</h1>
      <p className="subtitle">Razem tworzymy lepsze jutro.</p>

      <div className="stats-container">
        <div className="stat-card trees">
          <div className="stat-value">142</div>
          <div className="stat-label">URATOWANE DRZEWA</div>
        </div>

        <div className="stat-card bottles">
          <div className="stat-value">1250</div>
          <div className="stat-label">ZWRÓCONYCH BUTELEK</div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings">
      <h2>Ustawienia</h2>

      <button className="setting-item">
        <div className="setting-left">
          <FiBell />
          <span>Powiadomienia</span>
        </div>
      </button>

      <button className="setting-item">
        <div className="setting-left">
          <FiShield />
          <span>Prywatnosc</span>
        </div>
      </button>

      <button className="setting-item">
        <div className="setting-left">
          <FiKey />
          <span>Zmien haslo</span>
        </div>
      </button>

      <button className="setting-item">
        <div className="setting-left">
          <FiGlobe />
          <span>Jezyk</span>
        </div>

        <span className="setting-value">POLSKI</span>
      </button>

      <button className="setting-item" onClick={() => setDarkMode((v) => !v)}>
        <div className="setting-left">
          <FiMoon />
          <span>Ciemny motyw</span>
        </div>

        <div className={`toggle$${darkMode ? " on" : ""}`}>
          <div className="toggle-circle"></div>
        </div>
      </button>

      <button className="setting-item">
        <div className="setting-left">
          <FiInfo />
          <span>O aplikacji</span>
        </div>
      </button>
    </div>
  );
}

function Logout() {
  const handleLogout = () => {
    if (auth) {
      signOut(auth);
    }
  };

  return (
    <button className="logout-link" onClick={handleLogout}>
      <FiLogOut />
      <span>Wyloguj sie</span>
    </button>
  );
}

export default function Profile() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!auth) {
      setUser({ 
        displayName: "Demo User", 
        email: "demo@example.com" 
      });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  if (user === undefined) return null;
  if (user === null) return <Navigate to="/login" replace />;

  return (
    <div className="profile-page">
      <AppHeader />
      <main className="profile-content">
        <UserInfo user={user} />
        <Settings />
        <Logout />
      </main>
      <BottomNav />
    </div>
  );
}
