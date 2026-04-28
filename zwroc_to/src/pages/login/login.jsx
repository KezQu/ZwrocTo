import { Link } from "react-router-dom";
import Logo from "../../components/logo";

function LoginForm() {
  const login_action = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    // const password = formData.get("password");

    console.log(`Login user: ${email}`);
  };
  return (
    <form onSubmit={login_action}>
      <p>E-MAIL</p>
      <input
        id="email"
        name="email"
        placeholder="Wpisz swój e-mail"
        type="email"
        required
      />
      <br />
      <p>HASŁO</p>
      <input
        id="password"
        name="password"
        placeholder="Wpisz hasło"
        type="password"
        required
      />
      <br />
      <Link to="/restore_password"> ZAPOMNIAŁEŚ HASŁA?</Link>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default function Login() {
  return (
    <div>
      <Logo />
      <div>
        <h2>Zaloguj się</h2>
        <LoginForm />
      </div>
      <div>
        <text>Nie masz konta? </text>
        <Link to="/register">Zarejestruj się</Link>
      </div>
    </div>
  );
}
