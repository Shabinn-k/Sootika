import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const Login = ({ setShowLogin }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.warn("Please agree to the terms and privacy policy");
      return;
    }

    if (loading) return;

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      setShowLogin(false);
    }
  };

  return (
    <div className="login-popup" role="dialog" aria-modal="true">
      <form
        onSubmit={handleSubmit}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>Sign In</h2>

          <button
            type="button"
            className="close-btn"
            aria-label="Close login popup"
            onClick={() => setShowLogin(false)}
          >
            ✕
          </button>
        </div>

        <div className="login-popup-inputs">
          <input
            type="email"
            placeholder="E-mail"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !agree}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        <p>
          Create a new account?{" "}
          <span
            onClick={() => {
              setShowLogin(false);
              navigate("/registration");
            }}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
