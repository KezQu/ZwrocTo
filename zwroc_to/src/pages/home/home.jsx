import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}
