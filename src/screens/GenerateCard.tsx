import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCards, type CardData } from '../contexts/CardsContext';
import './VistaMazo.css';

function GenerateCard() {
  const navigate = useNavigate();
  const { addCard } = useCards();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const clampStat = (value: number) => Math.min(300, Math.max(0, value));

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await axios.post(
        'https://educapi-v2.onrender.com/ai/generate-card',
        {
          globalContext: 'Temática Monster High, ataque 0-300, defensa 0-300, vida 1-300.',
          cardPrompt: prompt || '',
        },
        {
          headers: {
            usersecretpasskey: 'Aria278720EZ',
            'Content-Type': 'application/json',
          },
        }
      );

      const aiCard = response.data as Record<string, unknown>;
      const mappedCard: CardData = {
        nombre: String(aiCard.name || aiCard.nombre || 'Sin nombre'),
        apellido: String(aiCard.apellido || aiCard.lastName || ''),
        vida: clampStat(Number(aiCard.lifePoints ?? aiCard.vida ?? 0)),
        ataque: clampStat(Number(aiCard.attack ?? aiCard.ataque ?? 0)),
        defensa: clampStat(Number(aiCard.defense ?? aiCard.defensa ?? 0)),
        habilidad: String(aiCard.ability || aiCard.habilidad || ''),
        especie: String(aiCard.species || aiCard.especie || ''),
        imagen:
          String(aiCard.pictureUrl || aiCard.imagen || '') ||
          'https://via.placeholder.com/400x600.png?text=Sin+imagen',
      };

      await addCard(mappedCard);
      navigate('/');
    } catch (error) {
      console.error('Error generando carta con IA:', error);
      window.alert('No se pudo generar la carta con la IA. Intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>
            🤖
          </div>
          <h1 className="mh-title">Generar carta con IA</h1>
        </div>
      </header>

      <div className="overlay" role="dialog" aria-modal="true">
        <div className="modal" style={{ maxWidth: 720, width: '100%' }}>
          <h2>Genera una carta monstruosa</h2>
          <div className="card-form">
            <div className="form-row" style={{ gridColumn: '1 / -1' }}>
              <label>Prompt IA</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Describe la carta que deseas generar..."
                style={{ minHeight: 100, resize: 'vertical' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <button
              type="button"
              className="close-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generando...' : 'Generar carta y añadir al mazo'}
            </button>
            <button
              type="button"
              className="close-btn"
              onClick={() => navigate('/')}
              style={{ background: '#666' }}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateCard;
