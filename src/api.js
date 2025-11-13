import axios from 'axios';

// 🔹 URL del backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// =======================
// JUEGOS
// =======================
export const getJuegos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/juegos`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener juegos:', err);
    return [];
  }
};

// =======================
// RESEÑAS
// =======================
export const getReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener reseñas:', err);
    return [];
  }
};

export const createReview = async (review) => {
  try {
    const res = await axios.post(`${BASE_URL}/reviews`, review);
    return res.data;
  } catch (err) {
    console.error('Error al crear reseña:', err);
    return null;
  }
};
