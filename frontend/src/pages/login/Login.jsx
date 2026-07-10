import LoginForm from "../../components/login-form/LoginForm";
import styles from "./Login.module.scss";
import Tag from "../../components/tag/Tag";
import secureIcon from "../../assets/icons/secure-badge.svg";

export default function Login() {
  return (
    <>
      <main className={styles.loginPage}>
        <Tag>Staff Entry</Tag>

        <section className={styles.loginContainer}>
          <h1 className={styles.loginHeading}>Internal Access</h1>
          <p className={styles.loginDescription}>
            Please provide your credentials to enter the editorial suite.
          </p>

          <LoginForm />

          <div
            className={styles.securityBadge}
            aria-label="Secure encryption active"
          >
            <img src={secureIcon} alt="" className={styles.securityIcon} />
            <h4 className={styles.securityText}>Secure encryption active</h4>
          </div>
        </section>
      </main>
    </>
  );
}
