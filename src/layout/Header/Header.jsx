import { Mail } from "lucide-react";
import HeaderLayoutCarousel from "../../components/molecules/HeaderLayoutCarousel/HeaderLayoutCarousel";
import Icon from "../../components/atoms/Icon/Icon";
import { Link } from "react-router-dom";
import logo from "/Xital_logo.png";
import AccountDropdown from "../../components/molecules/AccountDropdown/AccountDropdown";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-main">
      {/* Top header content */}
      <div className="header-top">
        <div className="header-flex">
          <div className="header-contact">
            <Mail size={16}/>
            <a href="mailto:info@xital.com">info@xital.com</a>
          </div>

          <HeaderLayoutCarousel />
          <div className="header-social">
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <Icon name="facebook" size={14} />
              </a>
              <a href="#" aria-label="Twitter">
                <Icon name="twitter" size={14} />
              </a>
              <a href="#" aria-label="Instagram">
                <Icon name="instagram" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*Principal container */}
      <div className="header-principal-container">
        <div className="header-logo">
          {/*Logo*/}
          <Link to="/" className="logo" aria-label="Xital — ir al inicio">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/*Navigation bar*/}
        <div className="header-nav"></div>

        {/*User menu*/}
        <div className="header-user-menu">
          <AccountDropdown/>
          <Link
            to="/cart"
            className="carrito"
            aria-label="ver carrito de compras"
          >
            <Icon name="shoppingCart" size={20} />
            <span className="cart-badge-header"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
