import { Link } from "react-router-dom";
import Logo from "../../components/logo";

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
    <form onSubmit={register_action}>
      <p>IMIĘ</p>
      <input
        id="name"
        name="name"
        placeholder="Wpisz swoje imię"
        type="text"
        required
      />
      <br />
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
      <p>POWTÓRZ HASŁO</p>
      <input
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Wpisz ponownie hasło"
        type="password"
        required
      />
      <br />
      <button type="submit">Zarejestruj się</button>
    </form>
  );
}

export default function Register() {
  return (
    <div>
      <Logo />
      <div>
        <h2>Zarejestruj się</h2>
        <RegisterForm />
      </div>
      <div>
        <text>Masz już konto? </text>
        <Link to="/login">Zaloguj się</Link>
      </div>
    </div>
  );
}
