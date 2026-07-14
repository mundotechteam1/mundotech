import LoginForm from "../../components/login-form/LoginForm";
import styles from "./Login.module.scss";
import Tag from "../../components/tag/Tag";
import secureIcon from "../../assets/icons/secure-badge.svg";

export default function Login() {
  return (
    <>
      <main className={styles.loginPage}>
        <Tag>Acceso Privado</Tag>

        <section className={styles.loginContainer}>
          <h1 className={styles.loginHeading}>Acceso Interno</h1>
          <p className={styles.loginDescription}>
            Introduce tus credenciales para acceder al panel editorial.
          </p>

          <LoginForm />

          <div
            className={styles.securityBadge}
            aria-label="Cifrado seguro activo"
          >
            <img src={secureIcon} alt="" className={styles.securityIcon} />
            <h4 className={styles.securityText}>Cifrado seguro activo</h4>
          </div>
        </section>
      </main>
    </>
  );
}
