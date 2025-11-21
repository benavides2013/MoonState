// src/components/ResenaForm.jsx - VERSIÓN CORREGIDA

import { useState } from 'react';

export default function ResenaForm({ onSubmit, juegos = [] }) {
  const [formData, setFormData] = useState({
    juego: "",
    texto: "",
    autor: "",
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Limpiar error cuando el usuario escribe
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación
    if (!formData.juego) {
      setError("❌ Selecciona un juego");
      return;
    }
    if (!formData.texto.trim()) {
      setError("❌ Escribe tu reseña");
      return;
    }
    if (selectedRating === 0) {
      setError("❌ Selecciona una puntuación");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Buscar el juego seleccionado para obtener su _id
      const juegoSeleccionado = juegos.find(j => j._id === formData.juego);
      
      if (!juegoSeleccionado) {
        setError("❌ El juego seleccionado no existe");
        setLoading(false);
        return;
      }

      // Preparar datos
      const nuevaResena = {
        juego: formData.juego,
        texto: formData.texto.trim(),
        puntuacion: selectedRating,
        autor: formData.autor.trim() || "Anónimo"
      };

      console.log("📤 Enviando reseña:", nuevaResena);

      // Llamar a la función onSubmit
      await onSubmit(nuevaResena);

      // Limpiar formulario
      setFormData({ juego: "", texto: "", autor: "" });
      setSelectedRating(0);
      setSuccess("✅ ¡Reseña enviada exitosamente!");

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error al enviar reseña:", err);
      setError("❌ Error al enviar la reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-wrapper">
      <form onSubmit={handleSubmit}>
        
        {/* Mensajes de estado */}
        {error && <div className="form-message error">{error}</div>}
        {success && <div className="form-message success">{success}</div>}

        {/* Selección del juego */}
        <div className="form-group">
          <label htmlFor="juego">🎮 Selecciona un juego:</label>
          <select
            id="juego"
            name="juego"
            value={formData.juego}
            onChange={handleChange}
            className="form-input"
            disabled={juegos.length === 0}
          >
            <option value="">-- Selecciona un juego --</option>
            {juegos.map(j => (
              <option key={j._id} value={j._id}>
                {j.nombre || "Juego sin nombre"}
              </option>
            ))}
          </select>
          {juegos.length === 0 && <p className="form-hint">No hay juegos disponibles</p>}
        </div>

        {/* Nombre del autor (opcional) */}
        <div className="form-group">
          <label htmlFor="autor">👤 Tu nombre (opcional):</label>
          <input
            id="autor"
            type="text"
            name="autor"
            placeholder="Anónimo"
            value={formData.autor}
            onChange={handleChange}
            className="form-input"
            maxLength="50"
          />
        </div>

        {/* Texto de la reseña */}
        <div className="form-group">
          <label htmlFor="texto">📝 Tu reseña:</label>
          <textarea
            id="texto"
            name="texto"
            placeholder="Cuéntanos qué te pareció este juego..."
            value={formData.texto}
            onChange={handleChange}
            className="form-textarea"
            minLength="10"
            maxLength="500"
          />
          <small>{formData.texto.length}/500 caracteres</small>
        </div>

        {/* Puntuación */}
        <div className="form-group">
          <label>⭐ Puntuación:</label>
          <div className="rating-section">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                className={`emoji-btn ${selectedRating === n ? 'selected' : ''}`}
                onClick={() => setSelectedRating(n)}
                title={`${n} estrella${n > 1 ? 's' : ''}`}
              >
                {n} ⭐
              </button>
            ))}
          </div>
        </div>

        {/* Botón enviar */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading || juegos.length === 0}
        >
          {loading ? "📤 Enviando..." : "✅ Enviar Reseña"}
        </button>
      </form>
    </div>
  );
}