import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaRegCircleUser } from "react-icons/fa6";

function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const now = Date.now() / 1000;
    if (payload.exp <= now) {
      localStorage.removeItem("token");
      return null;
    }

    return { email: payload.sub, roles: payload.roles || [] };
  } catch {
    return null;
  }
}

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    setUser(getUserFromToken());
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
            <span className={styles.userName}>{user.email}</span>
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
