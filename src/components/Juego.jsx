export default function Juego({ juego, onDelete, onEdit }) {

  return (
    <div className="juego-card">
      {juego.portadaURL && 
      <img src={juego.portadaURL} alt={juego.nombre} 
      style={{ 
        width: '100%', 
        height: '200px', 
        objectFit: 'cover', 
        borderRadius: '5px', 
        marginBottom: '10px' }} />}
        
      <h3>🎮 {juego.nombre}</h3>
      {juego.genero && 
      <p><strong>Género:</strong> {juego.genero}</p>}
      {juego.plataforma && 
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>}
      {juego.estado && 
      <p><strong>Estado:</strong> {juego.estado}</p>}
      {juego.horasJugadas > 0 && 
      <p><strong>⏱️ Horas:</strong> {juego.horasJugadas}h</p>}
   <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={onEdit} 
        style={{ 
          flex: 1, 
          background: '#40496fff', 
          color: 'white', 
          border: 'none', 
          padding: '8px', 
          borderRadius: '50px', 
          cursor: 'pointer' }}>
            ✏️ Editar</button>
            
        <button onClick={onDelete} 
          style={{ 
          flex: 1, 
          background: '#733535ff', 
          color: 'white', 
          border: 'none', 
          padding: '8px', 
          borderRadius: '50px', 
          cursor: 'pointer' }}>🗑️ Eliminar</button>
      </div>
    </div>
  );
}