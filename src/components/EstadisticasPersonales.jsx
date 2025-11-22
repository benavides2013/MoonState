export default function EstadisticasPersonales({ juegos, resenas }) {
  const total = juegos.length;
  const completados = juegos.filter(j => j.completado).length;
  const horas = juegos.reduce((s, j) => s + (j.horasJugadas || 0), 0);
  const promedio = resenas.length ? (resenas.reduce((s, r) => s + r.puntuacion, 0) / resenas.length).toFixed(1) : 0;

  return (
    <section style={styles.section}>
      <h2 style={styles.h2}>📊 Mis Estadísticas</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🎮 Total</h3>
          <p style={styles.number}>{total}</p>
        </div>
        <div style={styles.card}>
          <h3>✅ Completados</h3>
          <p style={styles.number}>{completados}</p>
          <p style={styles.porcent}>{total > 0 ? Math.round(completados/total*100) : 0}%</p>
        </div>
        <div style={styles.card}>
          <h3>⏱️ Horas</h3>
          <p style={styles.number}>{horas}h</p>
        </div>
        <div style={styles.card}>
          <h3>⭐ Promedio</h3>
          <p style={styles.number}>{promedio}/5</p>
        </div>
      </div>
    </section>
  );
}

