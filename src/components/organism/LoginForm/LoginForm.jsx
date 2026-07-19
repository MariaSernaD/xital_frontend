import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Icon from "../../atoms/Icon/Icon";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formt-data");
    setLoading(true);
    setError("");
  };

  return (
    <div className="principal-container-form">
      <div className="login-card">
        <h2 className="login-title">Mi Cuenta</h2>
        <Icon name="user" size={50} className="login-icon"></Icon>
        <div className="demo-users">
          <h4>Usuarios de prueba:</h4>
          <div className="users">
            <strong>Cliente: </strong>cliente@email.com / cliente123
          </div>
          <div className="users">
            <strong>Admin: </strong>admin@email.com / admin456
          </div>
        </div>

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
          {error && <p className="login-error">{error}</p>}
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
            <div className="login-footer">
              <span className="span-login-dos">
                ¿Olvidaste tu <a href="#">contraseña?</a>
              </span>
            </div>
          </div>
        </form>
        {/* Enlace a registro — secundario, no compite con el botón principal */}
        <div className="login-footer">
          <span className="span-login">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </span>
        </div>

        <div className="login-footer-dos">
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
