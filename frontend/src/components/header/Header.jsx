import styles from "./Header.module.scss";
import { FaRegCircleUser } from "react-icons/fa6";

function Header() {
  const getUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("lastEmail");
    localStorage.removeItem("lastPassword");
    window.location.href = "/login";
  };

  const fechaActual = new Date();

  const dias = [
    "DOMINGO",
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO",
  ];

  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const fecha = `${dias[fechaActual.getDay()]}, ${fechaActual.getDate()} DE ${
    meses[fechaActual.getMonth()]
  } DE ${fechaActual.getFullYear()}`;

  return (
    <header className={styles.header}>
      <div className={styles.userArea}>
        {user ? (
          <>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <a
            href="/login"
            className={styles.loginLink}
            aria-label="Iniciar sesión"
          >
            <FaRegCircleUser />
          </a>
        )}
      </div>

      <div className={styles.newspaper}>
        <div className={styles.line}></div>

        <h1>
          <a href="/" aria-label="Ir al inicio">
            <span>MUNDO</span>
            <span>TECH</span>
          </a>
        </h1>

        <div className={styles.line}></div>

        <div className={styles.bottom}>
          <p>{fecha}</p>
          <p>BARCELONA</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
