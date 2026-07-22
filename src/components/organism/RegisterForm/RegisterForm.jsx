import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";
import Input from "../../atoms/Input/Input";
import Icon from "../../atoms/Icon/Icon";
import RegisterErrorMessage from "../../molecules/RegisterErrorMessage/RegisterErrorMessage";
import Button from "../../atoms/Button/Button";
import "./RegisterForm.css";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorKind, setErrorKind] = useState(null);
  const [errorFields, setErrorFields] = useState({});

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    // Limpiar error de ese campo si lo había
    if (errorFields[field]) {
      setErrorFields((prev) => ({ ...prev, [field]: null }));
    }
  };

  //validar los campos del formulario
  const validate = (form) => {
    const errors = {};
    //Nombre
    if (!form.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (form.name.trim().length < 2) {
      errors.name = "El nombre debe tener al menos dos caracteres";
    }

    //Email
    if (!form.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Tu correo electrónico no tiene un formato valido";
    }

    //Password
    if (!form.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (form.password.trim().length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    //Confirm password
    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = "Necesitas confirmar tu contraseña";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const onSubmit =  async (event) => {          
  event.preventDefault();

  const errors = validate(form);

  if (Object.keys(errors).length > 0) {
    setErrorFields(errors);
    return;
  }

  setErrorFields({});
  setErrorKind(null)
   setLoading(true);

  try {
    await register({ name: form.name, email: form.email, password: form.password });
    navigate("/login", { state: { justRegistered: true, email: form.email } });
  } catch (err) {
    handleRegisterError(err);
  } finally {
    setLoading(false);
  }
  
};

  const handleRegisterError = (err) => {
    const kind = err.kind || "UNKNOWN";

    if (kind === "CLIENT_ERROR" && err.status === 400) {
      const backendMessage = err.original?.response?.data?.message;
      if (backendMessage === "User already exists") {
        setErrorFields({ email: "Este email ya está registrado" });
        return;
      }
      setErrorKind("BAD_REQUEST");
      return;
    }

    if (kind === "VALIDATION" && err.fields) {
      const fieldErrors = {};
      err.fields.forEach((f) => {
        fieldErrors[f.path || f.param] = f.msg;
      });
      setErrorFields(fieldErrors);
      return;
    }
  };

  return (
    <div className="principal-register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>
        <Icon name="user" size={50} className="register-icon"></Icon>
        <form className="register-form" onSubmit={onSubmit} noValidate>
          <div className="form-inputs">
            <Input
              id="name"
              label="Nombre completo *"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Tu nombre"
            />
            {errorFields.name && (
              <span className="field-errors">{errorFields.name}</span>
            )}
          </div>

          <div className="form-inputs">
            <Input
              id="email"
              label="Correo electrónico *"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="Tu correo electrónico"
            />
            {errorFields.email && (
              <span className="field-errors">{errorFields.email}</span>
            )}
          </div>

          <div className="form-inputs">
            <Input
              id="password"
              label="Contraseña *"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Tu contraseña"
            />
            {errorFields.password && (
              <span className="field-errors">{errorFields.password}</span>
            )}
          </div>

          <div className="form-inputs">
            <Input
              id="confirmPassword"
              label="Confirmar contraseña *"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirma tu contraseña"
            />
            {errorFields.confirmPassword && (
              <span className="field-errors">
                {errorFields.confirmPassword}
              </span>
            )}
          </div>

          {errorKind && <RegisterErrorMessage kind={errorKind} />}

          <Button disabled={loading} type="submit" variant="primary">
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="register-footer">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
