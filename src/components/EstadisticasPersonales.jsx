import '../styles/EstadisticasPersonales.css';

export default function EstadisticasPersonales({ juegos, resenas }) {
  const total = juegos.length;
  const completados = juegos.filter(j => j.completado).length;
  const horas = juegos.reduce((s, j) => s + (j.horasJugadas || 0), 0);
  const promedio = resenas.length ? (resenas.reduce((s, r) => s + r.puntuacion, 0) / resenas.length).toFixed(1) : 0;

  return (
    <section id="estadisticas">
      <h2>📊 Mis Estadísticas</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🎮 Total</h3>
          <p className="stat-number">{total}</p>
        </div>
        <div className="stat-card">
          <h3>✅ Completados</h3>
          <p className="stat-number">{completados}</p>
          <p className="stat-percentage">{total > 0 ? Math.round(completados/total*100) : 0}%</p>
        </div>
        <div className="stat-card">
          <h3>⏱️ Horas</h3>
          <p className="stat-number">{horas}h</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Promedio</h3>
          <p className="stat-number">{promedio}/5</p>
        </div>
      </div>
    </section>
  );
}