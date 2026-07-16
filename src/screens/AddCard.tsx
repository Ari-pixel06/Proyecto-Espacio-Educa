import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCards, type CardData } from '../contexts/CardsContext';
import './VistaMazo.css';

function AddCard() {
  const { addCard, updateCard, cards } = useCards();
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = useParams();
  const isEditing = !!cardId;
  const editIndex = cardId ? Number(cardId) : -1;

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    vida: '',
    ataque: '',
    defensa: '',
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
        vida: String(card.vida) || '',
        ataque: String(card.ataque) || '',
        defensa: String(card.defensa) || '',
        habilidad: card.habilidad || '',
        especie: card.especie || '',
        imagen: card.imagen || '',
      });
      return;
    }

    const generatedCard = (location.state as { generatedCard?: CardData } | null)?.generatedCard;
    if (generatedCard) {
      setForm({
        nombre: generatedCard.nombre || '',
        apellido: generatedCard.apellido || '',
        vida: String(generatedCard.vida) || '',
        ataque: String(generatedCard.ataque) || '',
        defensa: String(generatedCard.defensa) || '',
        habilidad: generatedCard.habilidad || '',
        especie: generatedCard.especie || '',
        imagen: generatedCard.imagen || '',
      });
    }
  }, [isEditing, editIndex, cards, location.state]);

  const clampStat = (value: number) => Math.min(300, Math.max(0, value));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const clampedValue =
      name === 'vida' || name === 'ataque' || name === 'defensa'
        ? value === ''
          ? ''
          : String(clampStat(Number(value)))
        : value;

    setForm((f) => ({ ...f, [name]: clampedValue }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const card: CardData = {
      nombre: form.nombre || 'Sin nombre',
      apellido: form.apellido,
      vida: clampStat(Number(form.vida) || 0),
      ataque: clampStat(Number(form.ataque) || 0),
      defensa: clampStat(Number(form.defensa) || 0),
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
              <label>Vida</label>
              <input name="vida" value={form.vida} onChange={handleChange} type="number" min="0" max="300" />
            </div>
            <div className="form-row">
              <label>Ataque</label>
              <input name="ataque" value={form.ataque} onChange={handleChange} type="number" min="0" max="300" />
            </div>
            <div className="form-row">
              <label>Defensa</label>
              <input name="defensa" value={form.defensa} onChange={handleChange} type="number" min="0" max="300" />
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
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
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
