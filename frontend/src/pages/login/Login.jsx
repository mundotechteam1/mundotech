import LoginForm from "../../components/login-form/LoginForm";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <>
      <main className={styles.loginPage}>
        <section className={styles.loginContainer}>
          <h1 className={styles.loginHeading}>Internal Access</h1>
          <p className={styles.loginDescription}>Please provide your credentials to enter the editorial suite.</p>

          <LoginForm />
        </section>
      </main>
    </>
  );
}
