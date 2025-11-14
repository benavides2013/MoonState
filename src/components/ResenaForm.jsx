import { useState } from 'react';

export default function ResenaForm({ onSubmit, juegos = [] }) {
  const [formData, setFormData] = useState({
    juego: "",
    texto: "",
  });

  const [selectedRating, setSelectedRating] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.juego || !formData.texto || selectedRating === 0) {
      alert("Completa todos los campos");
      return;
    }

    onSubmit({
      juego: formData.juego,
      texto: formData.texto,
      puntuacion: selectedRating
    });

    // limpiar formulario
    setFormData({ juego: "", texto: "" });
    setSelectedRating(0);
  };

  return (
    <div className="review-form-wrapper">
      
      {/* Selección del juego */}
      <select
        name="juego"
        value={formData.juego}
        onChange={handleChange}
      >
        <option value="">Selecciona un juego...</option>
        {juegos.map(j => (
          <option key={j._id} value={j._id}>
            {j.nombre}
          </option>
        ))}
      </select>

      {/* Texto de la reseña */}
      <textarea
        name="texto"
        placeholder="Escribe tu reseña..."
        value={formData.texto}
        onChange={handleChange}
      />

      {/* Puntuación */}
      <div className="rating-section">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={selectedRating === n ? "selected" : ""}
            onClick={() => setSelectedRating(n)}
          >
            {"⭐".repeat(n)}
          </button>
        ))}
      </div>

      <button type="button" onClick={handleSubmit}>
        Enviar Reseña
      </button>
    </div>
  );
}
