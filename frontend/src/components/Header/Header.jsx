import styles from "./Header.module.scss";
import { FaRegCircleUser } from "react-icons/fa6";

function Header() {
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
    <header className="header">
      <div className="user-icon">
        <FaRegCircleUser />
      </div>

      <div className="newspaper">
        <div className="line"></div>

        <h1>
          <a href="/" aria-label="Iniciar sesión">
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
