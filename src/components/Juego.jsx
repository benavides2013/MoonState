// src/components/Juego.jsx
export default function Juego({ nombre, genero }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>Género: {genero}</p>
    </div>
  );
}
