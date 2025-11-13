// src/components/ReviewList.jsx
export default function ReviewList({ reviews }) {
  if (!reviews.length) {
    return <p>No hay reseñas todavía.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review._id}>
          <h4>{review.nombreJugador}</h4>
          <p>{review.comentario}</p>
          <small>⭐ {review.puntuacion}/5</small>
        </div>
      ))}
    </div>
  );
}
