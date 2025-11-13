// src/components/Header.jsx
export default function Header({ menuOpen, setMenuOpen }) {
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header>
      <div className="header-container">
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <div className="logo"><div className="moon"></div>MOONSTATE</div>
        <nav>
          <a href="#inicio" onClick={handleNavClick}>Inicio</a>
          <a href="#juegos" onClick={handleNavClick}>Juegos</a>
          <a href="#reseñas" onClick={handleNavClick}>Reseñas</a>
          <a href="#estadisticas" onClick={handleNavClick}>Estadísticas</a>
        </nav>
      </div>
    </header>
  );
}
