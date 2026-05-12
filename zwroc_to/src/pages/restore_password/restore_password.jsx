import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./restore_password.css";

function RestorePasswordForm() {
  const restore_password_action = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    console.log(`Reset for user: ${email}`);
  };

  return (
    <form onSubmit={restore_password_action} className="restore-password-form">
      <label className="form-label">E-MAIL</label>
      <input
        className="form-input"
        id="email"
        name="email"
        placeholder="Wpisz swój e-mail"
        type="email"
        required
      />

      <div className="return-to-login">
        <Link to="/login">WRÓĆ DO LOGOWANIA</Link>
      </div>

      <button type="submit" className="restore-password-button">
        Wyślij link do resetowania hasła →
      </button>
    </form>
  );
}

export default function RestorePassword() {
  return (
    <div className="restore-password-page">
      <div className="logo-container">
        <Logo />
      </div>

      <div className="restore-password-card">
        <h2 className="restore-password-title">Zresetuj hasło</h2>
        <RestorePasswordForm />
      </div>
    </div>
  );
}
