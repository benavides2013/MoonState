// api.jsx

import axios from 'axios';

// Vite usa import.meta.env en lugar de process.env
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// --------------------- Juegos ---------------------
export const getJuegos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/juegos`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener juegos:', err);
    return [];
  }
};

// -------------------- Reseñas ---------------------
export const getResena = async (juegoId) => {
  try {
    const res = await axios.get(`${BASE_URL}/resenas/${juegoId}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener reseñas del juego:', err);
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

// Export por defecto (opcional)
export default {
  getJuegos,
  getResena,
  createResena
};
