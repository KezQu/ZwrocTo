import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./login.css";

function LoginForm() {
  const navigate = useNavigate();

  const login_action = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    console.log(`Login user: ${email}`);

    console.log(`Login successful navigating to home page`);
    navigate("/");
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

      <button type="submit" className="login-button">
        Zaloguj się →
      </button>
    </form>
  );
}

export default function Login() {
  return (
    <div className="login-page">
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
