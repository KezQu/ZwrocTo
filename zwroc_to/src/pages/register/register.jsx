import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Logo from "../../components/logo/logo";
import "./register.css";
import AppHeader from "../../components/app_header/app_header";

function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register_action = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Hasła nie są identyczne!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/login");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Konto z tym adresem e-mail już istnieje.");
          break;
        case "auth/weak-password":
          setError("Hasło jest za słabe. Musi mieć co najmniej 6 znaków.");
          break;
        case "auth/invalid-email":
          setError("Nieprawidłowy adres e-mail.");
          break;
        default:
          setError("Wystąpił błąd. Spróbuj ponownie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={register_action} className="register-form">
      <label className="form-label">IMIĘ</label>
      <input
        className="form-input"
        id="name"
        name="name"
        placeholder="Wpisz swoje imię"
        type="text"
        required
      />
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
      <label className="form-label">POWTÓRZ HASŁO</label>
      <input
        className="form-input"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Wpisz ponownie hasło"
        type="password"
        required
      />
      {error && <p className="form-error">{error}</p>}

      <br />
      <button type="submit" className="register-button" disabled={loading}>
        {loading ? "Rejestrowanie..." : "Zarejestruj się"}
      </button>
    </form>
  );
}

export default function Register() {
  return (
    <div className="register-page">
      <AppHeader />
      <div className="logo-container">
        <Logo />
      </div>

      <div className="register-card">
        <h2 className="register-title">Zarejestruj się</h2>
        <RegisterForm />
      </div>

      <div className="login-section">
        <span>Masz już konto? </span>
        <Link to="/login">Zaloguj się</Link>
      </div>
    </div>
  );
}
