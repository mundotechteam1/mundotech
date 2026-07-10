import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      // manejar login correcto
    } catch (err) {
      // aquí puedes setear un error global si quieres
    }
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="email">Electronic Mail Address</label>
      <input
        id="email"
        type="email"
        placeholder="editor@mundotech.pub"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
      />
      {errors.email && (
        <p className={styles.formError} role="alert">
          {errors.email.message}
        </p>
      )}

      <label htmlFor="password">Security Cipher</label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors.password && (
        <p className={styles.formError} role="alert">
          {errors.password.message}
        </p>
      )}

      <button className={styles.loginBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading…" : "Login"}
      </button>

      {/* <a className="forgot-link" href="/forgot-password"> 
        Forgotten passcode?
      </a>*/}
    </form>
  );
}

export default LoginForm;
