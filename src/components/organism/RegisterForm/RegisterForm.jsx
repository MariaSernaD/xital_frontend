import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../atoms/Input/Input";


export default function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    } else if (errors.name.trim().length > 2) {
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
    } else if (errors.password.trim().length > 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    //Confirm password
    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = "Necesitas confirmar tu contraseña";
    } else if (!form.confirmPassword !== form.password) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  return (
    <div className="principal-register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>
        <form className="register-form" onSubmit={() => {}}>
          <div className="form-group">
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
        </form>
        <div className="register-footer">
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
