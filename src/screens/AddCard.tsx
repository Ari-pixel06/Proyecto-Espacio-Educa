import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCards, type CardData } from '../contexts/CardsContext';
import './VistaMazo.css';

function AddCard() {
  const { addCard, updateCard, cards } = useCards();
  const navigate = useNavigate();
  const { cardId } = useParams();
  const isEditing = !!cardId;
  const editIndex = cardId ? Number(cardId) : -1;

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    padres: '',
    habilidad: '',
    especie: '',
    imagen: '',
  });

  useEffect(() => {
    if (isEditing && editIndex >= 0 && cards[editIndex]) {
      const card = cards[editIndex];
      setForm({
        nombre: card.nombre || '',
        apellido: card.apellido || '',
        edad: String(card.edad) || '',
        padres: card.padres || '',
        habilidad: card.habilidad || '',
        especie: card.especie || '',
        imagen: card.imagen || '',
      });
    }
  }, [isEditing, editIndex, cards]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const card: CardData = {
      nombre: form.nombre || 'Sin nombre',
      apellido: form.apellido,
      edad: Number(form.edad) || 0,
      padres: form.padres,
      habilidad: form.habilidad,
      especie: form.especie,
      imagen:
        form.imagen ||
        'https://via.placeholder.com/400x600.png?text=Sin+imagen',
    };

    if (isEditing) {
      updateCard(editIndex, card);
    } else {
      addCard(card);
    }
    navigate('/');
  }

  return (
    <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>
            💀
          </div>
          <h1 className="mh-title">{isEditing ? 'Editar carta' : 'Añadir carta'}</h1>
        </div>
      </header>

      <div className="overlay" role="dialog" aria-modal="true">
        <div className="modal">
          <h2>Agregar carta</h2>
          <form onSubmit={handleSubmit} className="card-form">
            <div className="form-row">
              <label>Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label>Apellido</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>Edad</label>
              <input name="edad" value={form.edad} onChange={handleChange} type="number" min="0" />
            </div>
            <div className="form-row">
              <label>Padres</label>
              <input name="padres" value={form.padres} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>Habilidad</label>
              <input name="habilidad" value={form.habilidad} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>Especie</label>
              <input name="especie" value={form.especie} onChange={handleChange} />
            </div>
            <div className="form-row">
              <label>Imagen (URL)</label>
              <input name="imagen" value={form.imagen} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button type="submit" className="close-btn">
                Guardar
              </button>
              <button type="button" className="close-btn" onClick={() => navigate('/')} style={{ background: '#666' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
