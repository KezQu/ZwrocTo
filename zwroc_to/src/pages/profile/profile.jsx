import { Link } from "react-router-dom";
import Title from "../../components/title/title";
import PackagingReturned from "../../components/packaging_returned/packaging_returned";
import TreesSaved from "../../components/trees_saved/trees_saved";
import "./profile.css";

function UserInfo() {
  const user_name = "Horacy"; // Change to React state?

  return (
    <div>
      <div>
        <p>User Photo</p>
      </div>
      <h3>Cześć, {user_name}!</h3>
      <p>Razem tworzymy lepsze jutro.</p>
      <PackagingReturned />
      <TreesSaved />
    </div>
  );
}

function Settings() {
  const notifications_action = () => {
    console.log(`notifications change requested`);
  };

  const privacy_action = () => {
    console.log(`privacy change requested`);
  };

  const password_action = () => {
    console.log(`password change requested`);
  };

  const language_action = () => {
    console.log(`language change requested`);
  };

  const appearance_action = () => {
    console.log(`appearance change requested`);
  };

  const about_app_action = () => {
    console.log(`about app info requested`);
  };

  return (
    <div>
      <h2>Ustawienia</h2>
      <button onClick={notifications_action}>Powiadomienia</button>
      <br />
      <button onClick={privacy_action}>Prywatność</button>
      <br />
      <button onClick={password_action}>Zmień hasło</button>
      <br />
      <button onClick={language_action}>Język</button>
      <br />
      <button onClick={appearance_action}>Ciemny motyw</button>
      <br />
      <button onClick={about_app_action}>O aplikacji</button>
      <br />
    </div>
  );
}

function Logout() {
  const logout_action = () => {
    console.log(`user requested to logout`);
  };

  return (
    <Link to="/" onClick={logout_action}>
      Wyloguj się
    </Link>
  );
}

export default function Profile() {
  return (
    <div className="register-page">
      <Title />
      <UserInfo />
      <Settings />
      <br />
      <Logout />
    </div>
  );
}
