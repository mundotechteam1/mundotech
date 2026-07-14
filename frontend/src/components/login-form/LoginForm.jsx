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
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");
    const savedPassword = localStorage.getItem("lastPassword");
    if (savedEmail) setValue("email", savedEmail);
    if (savedPassword) setValue("password", savedPassword);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorMsg = res.status === 401
          ? "Invalid email or password"
          : "An unexpected error occurred. Please try again.";
        throw new Error(errorMsg);
      }

      const userData = await res.json();
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("lastEmail", data.email);
      localStorage.setItem("lastPassword", data.password);

      const isManager = userData.roles?.some(
        (role) => role === "ROLE_MANAGER" || role === "MANAGER"
      );
      navigate(isManager ? "/dashboard-manager" : "/dashboard-author");
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

      <button className={styles.loginBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando…" : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
