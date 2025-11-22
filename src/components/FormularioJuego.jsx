import { useState, useEffect } from 'react';
import { getJuegoById, saveJuego } from '../services/api';
import '../styles/FormularioJuego.css';

export default function FormularioJuego({ juegoId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    desarrollador: '',
    año: new Date().getFullYear(),
    plataforma: '',
    portadaURL: '',
    descripcion: '',
    completado: false,
    horasJugadas: 0
  });

  useEffect(() => {
    if (juegoId) {
      const load = async () => {
        const juego = await getJuegoById(juegoId);
        if (juego) setFormData(juego);
      };
      load();
    }
  }, [juegoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.genero) {
      alert('Completa nombre y género');
      return;
    }
    const saved = await saveJuego(formData);
    if (saved) {
      onSave(saved);
      alert('✅ Guardado');
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{juegoId ? '✏️ Editar' : '➕ Agregar'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre *" value={formData.nombre} onChange={handleChange} required />
          <select name="genero" value={formData.genero} onChange={handleChange} required>
            <option value="">Género *</option>
            <option>Acción</option>
            <option>RPG</option>
            <option>Estrategia</option>
            <option>Deportes</option>
            <option>Puzzle</option>
          </select>
          <input type="text" name="desarrollador" placeholder="Desarrollador" value={formData.desarrollador} onChange={handleChange} />
          <input type="number" name="año" placeholder="Año" value={formData.año} onChange={handleChange} />
          <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
            <option value="">Plataforma</option>
            <option>PC</option>
            <option>PS5</option>
            <option>Xbox</option>
            <option>Nintendo</option>
          </select>
          <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} rows="3" />
          <input type="text" name="portadaURL" placeholder="URL portada" value={formData.portadaURL} onChange={handleChange} />
          <input type="number" name="horasJugadas" placeholder="Horas jugadas" value={formData.horasJugadas} onChange={handleChange} />
          <label>
            <input type="checkbox" name="completado" checked={formData.completado} onChange={handleChange} />
            ✅ Completado
          </label>
          <div className="form-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}