import { useState } from 'react';

export default function ResenaForm({ onSubmit }) {
  const [formData, setFormData] = useState({ gameNombre: '', gameResena: '' });
  const [selectedRating, setSelectedRating] = useState(0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (formData.gameNombre && formData.gameResena && selectedRating > 0) {
      onSubmit({ 
        juegoNombre: formData.gameNombre, 
        texto: formData.gameResena, 
        puntuacion: selectedRating 
      });
      setFormData({ gameNombre: '', gameResena: '' });
      setSelectedRating(0);
    } else {
      alert('Completa todos los campos y selecciona una puntuación');
    }
  };

  return (
    <div className="review-form-wrapper">
      <input
        type="text"
        id="gameNombre"
        placeholder="Nombre del Juego"
        value={formData.gameNombre}
        onChange={handleInputChange}
      />
      <textarea
        id="gameResena"
        placeholder="Escribe tu reseña..."
        value={formData.gameResena}
        onChange={handleInputChange}
      />
      <div className="rating-section">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={selectedRating === n ? 'selected' : ''}
            onClick={() => setSelectedRating(n)}
          >
            {'⭐'.repeat(n)}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleSubmit}>Enviar Reseña</button>
    </div>
  );
}
