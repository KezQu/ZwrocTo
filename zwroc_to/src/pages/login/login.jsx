import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Logo from "../../components/logo/logo";
import "./login.css";
import AppHeader from "../../components/app_header/app_header";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login_action = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/map");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Nieprawidłowy e-mail lub hasło.");
          break;
        case "auth/too-many-requests":
          setError("Zbyt wiele prób logowania. Spróbuj ponownie później.");
          break;
        default:
          setError("Wystąpił błąd. Spróbuj ponownie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={login_action} className="login-form">
      <label className="form-label">E-MAIL</label>
      <input
        className="form-input"
        id="email"
        name="email"
        placeholder="Wpisz swój e-mail"
        type="email"
        required
      />

      <label className="form-label">HASŁO</label>
      <input
        className="form-input"
        id="password"
        name="password"
        placeholder="Wpisz hasło"
        type="password"
        required
      />

      <div className="forgot-password">
        <Link to="/restore_password">ZAPOMNIAŁEŚ HASŁA?</Link>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="login-button" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się →"}
      </button>
    </form>
  );
}

export default function Login() {
  return (
    <div className="login-page">
      <AppHeader />
      <div className="logo-container">
        <Logo />
      </div>

      <div className="login-card">
        <h2 className="login-title">Zaloguj się</h2>
        <LoginForm />
      </div>

      <div className="register-section">
        <span>Nie masz konta? </span>
        <Link to="/register">Zarejestruj się</Link>
      </div>
    </div>
  );
}
