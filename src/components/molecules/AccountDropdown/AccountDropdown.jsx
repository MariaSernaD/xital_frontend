import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../atoms/Icon/Icon";
import "./AccountDropdown.css"

export default function AccountDropdown() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuAccountOpen, setIsMenuAccountOpen] = useState(false);

  //referencias por si el usuario da clicks afuera
  const userMenuRef = useRef(null);

  //cerrar menu con tecla Esc y clicks afuera
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuAccountOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsMenuAccountOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    setIsMenuAccountOpen(false);
  };

  const handleRegister = () => {
    setIsMenuAccountOpen(false);
  };
  const handleLogout = () => {
    logout();
    setIsMenuAccountOpen(false);
    navigate("/");
  };

  const handleMenuOpenToggle = () => {
    setIsMenuAccountOpen(!isMenuAccountOpen);
  };

  //Iniciales de usuario
  const getUserInitials = (userData) => {
    if (!userData) return "U";
    const userName = userData.name || userData.email || "Usuario";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName= (userData)=>{
    if(!userData) return "Usuario";
    return userData.name || userData.email || "Usuario"
  };

  return (
    <div className="header-account-menu">
      <div className="menu-content">
        <div className="user-menu-container" ref={userMenuRef}>
          <button
            className={`user-info ${isMenuAccountOpen ? "active" : ""}`}
            onClick={handleMenuOpenToggle}
            aria-label="Menú de usuario"
            aria-expanded={isMenuAccountOpen}
          >
            <div className="user-avatar">
              <span className="user-initials">
                {isAuthenticated ? (
                  getUserInitials(user)
                ) : (
                  <Icon name="user" size={16} />
                )}
              </span>
            </div>
            <div className="user-text">
              <span className="greeting">
                {isAuthenticated
                  ? `Hola, ${getDisplayName(user)}`
                  : "Hola, Inicia sesión"}
              </span>
              <span className="account-text">
                {isAuthenticated ? "Mi Cuenta" : "Cuenta y Listas"}
              </span>
            </div>
            <Icon
              name="chevronDown"
              size={14}
              className={`dropdown-arrow ${isMenuAccountOpen ? "rotated" : ""}`}
            />
          </button>
          {isMenuAccountOpen && (
            <div className="user-dropdown">
              {!isAuthenticated ? (
                <div className="auth-section">
                  <div className="auth-header">
                    <Icon name="user" size={24} />
                    <span>Accede a tu cuenta</span>
                  </div>
                  <Link
                    to="/login"
                    className="auth-btn primary"
                    onClick={handleLogin}
                  >
                    <Icon name="logIn" size={16} />
                    Iniciar Sesión
                  </Link>
                  <Link to="/register"
                    className="auth-btn secondary"
                    onClick={handleRegister}
                  >
                    <Icon name="userPlus" size={16} />
                    Crear Cuenta
                  </Link>
                </div>
              ) : (
                <div className="user-section">
                  <div className="user-profile">
                    <div className="user-details">
                      <span className="user-name">{getDisplayName(user)}</span>
                    </div>
                  </div>

                  <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                      <Icon name="logOut" size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
