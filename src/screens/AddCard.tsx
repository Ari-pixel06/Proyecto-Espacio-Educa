import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    vida: '',
    ataque: '',
    defensa: '',
    habilidad: '',
    especie: '',
    imagen: '',
  });
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    }
  }, [isEditing, editIndex, cards]);

  const clampStat = (value: number) => Math.min(300, Math.max(0, value));

  async function handleGenerateWithAI() {
    setIsGenerating(true);

    try {
      const response = await axios.post(
        'https://educapi-v2.onrender.com/ai/generate-card',
        {
          globalContext: 'Temática Monster High, ataque 0-300, defensa 0-300, vida 1-300.',
          cardPrompt: aiPrompt || '',
        },
        {
          headers: {
            usersecretpasskey: 'Aria278720EZ',
            'Content-Type': 'application/json',
          },
        }
      );

      const aiCard = response.data as Record<string, unknown>;
      const mappedCard = {
        nombre: String(aiCard.name || aiCard.nombre || 'Sin nombre'),
        apellido: '',
        vida: clampStat(Number(aiCard.lifePoints ?? aiCard.vida ?? 0)),
        ataque: clampStat(Number(aiCard.attack ?? aiCard.ataque ?? 0)),
        defensa: clampStat(Number(aiCard.defense ?? aiCard.defensa ?? 0)),
        habilidad: String(aiCard.ability || aiCard.habilidad || ''),
        especie: String(aiCard.species || aiCard.especie || ''),
        imagen: String(aiCard.pictureUrl || aiCard.imagen || ''),
      };

      setForm((prev) => ({
        ...prev,
        nombre: mappedCard.nombre,
        apellido: mappedCard.apellido,
        vida: String(mappedCard.vida),
        ataque: String(mappedCard.ataque),
        defensa: String(mappedCard.defensa),
        habilidad: mappedCard.habilidad,
        especie: mappedCard.especie,
        imagen: mappedCard.imagen,
      }));
    } catch (error) {
      console.error('Error generando carta con IA:', error);
      window.alert('No se pudo generar la carta con la IA. Intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  }

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
            <div className="form-row">
              <label>Prompt IA</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                placeholder="Crea tu propia carta Monstruosa"
                style={{ minHeight: 72, resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <button type="button" className="close-btn" onClick={handleGenerateWithAI} disabled={isGenerating}>
                {isGenerating ? 'Generando...' : 'Generar con IA'}
              </button>
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
