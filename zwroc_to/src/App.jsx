import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import RestorePassword from "./pages/restore_password/restore_password";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restore_password" element={<RestorePassword />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
