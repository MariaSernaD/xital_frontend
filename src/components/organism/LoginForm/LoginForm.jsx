import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Icon from "../../atoms/Icon/Icon";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage";
import RegisterErrorMessage from "../../molecules/RegisterErrorMessage/RegisterErrorMessage";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorKind, setErrorKind] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorKind(null);
    setErrorMessage("");
    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (err) => {
    const kind = err.kind || "UNKNOWN";
    if (kind === "CLIENT_ERROR" && err.status === 400) {
      const msg = err.original?.response?.data?.message;
      setErrorMessage(
        msg === "Invalid Credentials"
          ? "Email o contraseña incorrectos."
          : "Usuario no registrado. ¿Quieres crear una cuenta?",
      );
      return;
    }
    setErrorKind(kind);
  };

  return (
    <div className="principal-container-form">
      <div className="login-card">
        <h2 className="login-title">Mi Cuenta</h2>
        <Icon name="user" size={50} className="login-icon"></Icon>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-inputs">
            <Input
              id="email"
              label="Email: "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div className="login-inputs">
            <Input
              id="password"
              label="Contraseña: "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {errorKind && <RegisterErrorMessage kind={errorKind} />}

          <Button
            className="btn-login"
            disabled={loading}
            type="submit"
            variant="primary"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          <div className="remember-account">
            <label className="remember-label">
              <Input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                name="remember"
              />
              Recordarme
            </label>
            {/*<div className="login-footer">
              <span className="span-login-dos">
                ¿Olvidaste tu <a href="#">contraseña?</a>
              </span>
            </div>*/}
          </div>
        </form>
        {/* Enlace a registro — secundario, no compite con el botón principal */}
        <div className="login-footer">
          <span className="span-login">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </span>
        </div>

        <div className="login-footer-dos">
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
