// src/components/ReviewForm.jsx
import { useState } from 'react';

export default function ReviewForm({ onSubmit }) {
  const [formData, setFormData] = useState({ gameName: '', gameReview: '' });
  const [selectedRating, setSelectedRating] = useState(0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (formData.gameName && formData.gameReview && selectedRating > 0) {
      onSubmit({ ...formData, rating: selectedRating });
      setFormData({ gameName: '', gameReview: '' });
      setSelectedRating(0);
    } else {
      alert('Completa todos los campos y selecciona una puntuación');
    }
  };

  return (
    <div className="review-form-wrapper">
      <input
        type="text"
        id="gameName"
        placeholder="Nombre del Juego"
        value={formData.gameName}
        onChange={handleInputChange}
      />
      <textarea
        id="gameReview"
        placeholder="Escribe tu reseña..."
        value={formData.gameReview}
        onChange={handleInputChange}
      />
      <div className="rating-section">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            className={selectedRating === n ? 'selected' : ''}
            onClick={() => setSelectedRating(n)}
          >
            {'⭐'.repeat(n)}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>Enviar Reseña</button>
    </div>
  );
}
