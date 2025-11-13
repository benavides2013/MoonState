import { useState } from 'react';

export default function ResenaForm({ onSubmit }) {
  const [formData, setFormData] = useState({ gameResena: '' });
  const [selectedRating, setSelectedRating] = useState(0);

  const handleInputChange = (e) => {
    setFormData({ gameResena: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.gameResena && selectedRating > 0) {
      onSubmit({ texto: formData.gameResena, puntuacion: selectedRating });
      setFormData({ gameResena: '' });
      setSelectedRating(0);
    } else {
      alert('Completa todos los campos y selecciona una puntuación');
    }
  };

  return (
    <div className="review-form-wrapper">
      <textarea
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
