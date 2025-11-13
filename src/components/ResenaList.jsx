export default function ResenaList({ resenas }) {
  if (!resenas || !resenas.length) {
    return <p>No hay reseñas todavía.</p>;
  }

  return (
    <div className="resena-list">
      {resenas.map((resena) => (
        <div key={resena._id} className="resena-item">
          <h4>{resena.autor}</h4>
          <p>{resena.texto}</p>
          <small>⭐ {resena.puntuacion}/5</small>
        </div>
      ))}
    </div>
  );
}
