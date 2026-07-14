import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");
    const savedPassword = localStorage.getItem("lastPassword");
    if (savedEmail) setValue("email", savedEmail);
    if (savedPassword) setValue("password", savedPassword);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoginError("");

    if (!selectedRole) {
      setLoginError("Debes seleccionar un tipo de acceso.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? "Correo o contraseña incorrectos"
            : "Error inesperado. Inténtalo de nuevo.",
        );
      }

      const authHeader = res.headers.get("Authorization");
      if (!authHeader) {
        throw new Error("No se recibió token de autenticación.");
      }

      const token = authHeader.replace("Bearer ", "");

      const payload = JSON.parse(atob(token.split(".")[1]));

      const roles = payload.roles || [];

      if (selectedRole === "MANAGER" && !roles.includes("MANAGER")) {
        setLoginError("No tienes permisos de Manager.");
        return;
      }

      if (selectedRole === "AUTHOR" && !roles.includes("AUTHOR")) {
        setLoginError("No tienes permisos de Author.");
        return;
      }

      localStorage.setItem("token", token);

      navigate(
        selectedRole === "MANAGER" ? "/dashboard-manager" : "/dashboard-author",
      );
    } catch (err) {
      setLoginError(err.message);
    }
  };


  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {loginError && (
        <p className={styles.formErrorGlobal} role="alert">
          {loginError}
        </p>
      )}

      <label htmlFor="email">Correo Electrónico</label>
      <input
        id="email"
        type="email"
        placeholder="editor@mundotech.pub"
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Formato de correo inválido",
          },
        })}
      />
      {errors.email && (
        <p className={styles.formError} role="alert">
          {errors.email.message}
        </p>
      )}

      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        {...register("password", {
          required: "La contraseña es obligatoria",
        })}
      />
      {errors.password && (
        <p className={styles.formError} role="alert">
          {errors.password.message}
        </p>
      )}

      <div className={styles.roleSelector}>
        <label className={styles.roleOption}>
          <input
            type="checkbox"
            checked={selectedRole === "AUTHOR"}
            onChange={() =>
              setSelectedRole(selectedRole === "AUTHOR" ? null : "AUTHOR")
            }
          />
          AUTOR
        </label>

        <label className={styles.roleOption}>
          <input
            type="checkbox"
            checked={selectedRole === "MANAGER"}
            onChange={() =>
              setSelectedRole(selectedRole === "MANAGER" ? null : "MANAGER")
            }
          />
          MANAGER
        </label>
      </div>

      <button className={styles.loginBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando…" : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
