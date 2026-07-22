import Icon from "../Icon/Icon";
import "./ErrorMessage.css";

export default function ErrorMessage({ children }) {
  return (
    <div className="error-message">
      <Icon name="alertCircle" size={16} />
      <span>{children}</span>
    </div>
  );
}