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
export const getResenas = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/resenas`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener reseñas:', err);
    return [];
  }
};

export const createResena = async (resena) => {
  try {
    const res = await axios.post(`${BASE_URL}/resenas`, resena);
    return res.data;
  } catch (err) {
    console.error('Error al crear reseña:', err);
    return null;
  }
};

// Obtener reseñas de un juego específico
export const getResenasPorJuego = async (juegoId) => {
  try {
    const res = await axios.get(`${BASE_URL}/resenas/${juegoId}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener reseñas del juego:', err);
    return [];
  }
};
