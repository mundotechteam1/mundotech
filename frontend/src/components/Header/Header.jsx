import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <h1>MundoTech</h1>
      </div>

      <nav className="header__nav">
        <a href="/">Inicio</a>
        <a href="/news">Noticias</a>
        <a href="/login">Iniciar sesión</a>
        <a href="/register" className="btn-register">
          Registrarse
        </a>
      </nav>
    </header>
  );
}

export default Header;