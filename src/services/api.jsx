// src/services/api.jsx - VERSIÓN CORREGIDA

import axios from 'axios';

// Configurar URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Crear instancia de axios con configuración global
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------------------- JUEGOS ---------------------
export const getJuegos = async () => {
  try {
    const res = await apiClient.get('/juegos');
    return res.data || [];
  } catch (err) {
    console.error('Error al obtener juegos:', err.message);
    return [];
  }
};

// -------------------- RESEÑAS ---------------------

// Obtener TODAS las reseñas (sin filtro de juego)
export const getResena = async () => {
  try {
    const res = await apiClient.get('/resenas');
    return res.data || [];
  } catch (err) {
    console.error('Error al obtener reseñas:', err.message);
    return [];
  }
};

// Obtener reseñas de un juego específico
export const getResenasPorJuego = async (juegoId) => {
  try {
    if (!juegoId) {
      console.warn('juegoId no proporcionado');
      return [];
    }
    const res = await apiClient.get(`/resenas?juego=${juegoId}`);
    return res.data || [];
  } catch (err) {
    console.error(`Error al obtener reseñas del juego ${juegoId}:`, err.message);
    return [];
  }
};

// Crear nueva reseña
export const createResena = async (resena) => {
  try {
    if (!resena || !resena.juego || !resena.texto) {
      console.warn('Datos de reseña incompletos:', resena);
      return null;
    }

    const payload = {
      juego: resena.juego,
      texto: resena.texto,
      puntuacion: resena.puntuacion || 0,
      autor: resena.autor || 'Anónimo',
    };

    console.log('Enviando reseña:', payload);
    const res = await apiClient.post('/resenas', payload);
    
    console.log('Reseña creada:', res.data);
    return res.data || null;
  } catch (err) {
    console.error('Error al crear reseña:', err.response?.data || err.message);
    return null;
  }
};

// Actualizar una reseña
export const updateResena = async (resenaId, updates) => {
  try {
    if (!resenaId) {
      console.warn('resenaId no proporcionado');
      return null;
    }
    const res = await apiClient.put(`/resenas/${resenaId}`, updates);
    return res.data || null;
  } catch (err) {
    console.error(`Error al actualizar reseña ${resenaId}:`, err.message);
    return null;
  }
};

// Eliminar una reseña
export const deleteResena = async (resenaId) => {
  try {
    if (!resenaId) {
      console.warn('resenaId no proporcionado');
      return false;
    }
    await apiClient.delete(`/resenas/${resenaId}`);
    return true;
  } catch (err) {
    console.error(`Error al eliminar reseña ${resenaId}:`, err.message);
    return false;
  }
};

// Export por defecto
export default {
  getJuegos,
  getResena,
  getResenasPorJuego,
  createResena,
  updateResena,
  deleteResena,
};