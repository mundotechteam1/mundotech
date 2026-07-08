import styles from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../components/login-button/LoginButton";

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
      className={styles.LoginForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="email">Electronic Mail Address</label>
      <input
        id="email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
      />
      {errors.email && (
        <p className="form-error" role="alert">
          {errors.email.message}
        </p>
      )}

      <label htmlFor="password">Security Cipher</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      {errors.password && (
        <p className="form-error" role="alert">
          {errors.password.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading…" : "Login"}
      </Button>

      {/* <a className="forgot-link" href="/forgot-password"> 
        Forgotten passcode?
      </a>*/}
    </form>
  );
}

export default LoginForm;
