import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./register.css";

function RegisterForm() {
  const register_action = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Hasła nie są identyczne!");
      return;
    }

    console.log(`Creating account for: ${name}: ${email}`);
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
      <br />
      <button type="submit" className="register-button">
        Zarejestruj się
      </button>
    </form>
  );
}

export default function Register() {
  return (
    <div className="register-page">
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
