import { useLocation, useNavigate } from 'react-router-dom';
import { useCards } from '../contexts/CardsContext';
import Cartas from '../components/Cartas';
import './VistaMazo.css';

function Battle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cards } = useCards();
  const locationState = location.state as { selected?: number[] } | null;
  const selected = locationState?.selected ?? [];

  if (!selected || selected.length !== 2) {
    return (
      <div className="vista-mazo-root">
        <header className="mh-header">
          <div className="mh-logo-wrap">
            <div className="mh-logo-img" aria-hidden>
              💀
            </div>
            <h1 className="mh-title">Batalla de cartas</h1>
          </div>
        </header>
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Selecciona dos cartas antes de iniciar la batalla.</h2>
            <button className="close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
          </div>
        </div>
      </div>
    );
  }

  const firstCard = cards[selected[0]];
  const secondCard = cards[selected[1]];

  if (!firstCard || !secondCard) {
    return (
      <div className="vista-mazo-root">
        <header className="mh-header">
          <div className="mh-logo-wrap">
            <div className="mh-logo-img" aria-hidden>
              💀
            </div>
            <h1 className="mh-title">Batalla de cartas</h1>
          </div>
        </header>
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Una de las cartas seleccionadas no está disponible.</h2>
            <button className="close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>
            ⚔️
          </div>
          <h1 className="mh-title">Batalla Monster High</h1>
        </div>
      </header>

      <div className="overlay" role="dialog" aria-modal="true">
        <div className="view-modal battle-modal">
          <div className="battle-header">
            <h2>Primera carta vs Segunda carta</h2>
            <p>Elige a tu favorita y compara sus estadísticas.</p>
          </div>
          <div className="battle-grid">
            <div className="battle-side">
              <Cartas
                apellido={firstCard.apellido || ''}
                nombre={firstCard.nombre}
                vida={firstCard.vida}
                ataque={firstCard.ataque}
                defensa={firstCard.defensa}
                habilidad={firstCard.habilidad || ''}
                especie={firstCard.especie || ''}
                imagen={firstCard.imagen || ''}
              />
              <div className="battle-attrs">
                <p className="attr vida">Vida: <span>{firstCard.vida}</span></p>
                <p className="attr ataque">Ataque: <span>{firstCard.ataque}</span></p>
                <p className="attr defensa">Defensa: <span>{firstCard.defensa}</span></p>
              </div>
            </div>

            <div className="vs-badge">VS</div>

            <div className="battle-side">
              <Cartas
                apellido={secondCard.apellido || ''}
                nombre={secondCard.nombre}
                vida={secondCard.vida}
                ataque={secondCard.ataque}
                defensa={secondCard.defensa}
                habilidad={secondCard.habilidad || ''}
                especie={secondCard.especie || ''}
                imagen={secondCard.imagen || ''}
              />
              <div className="battle-attrs">
                <p className="attr vida">Vida: <span>{secondCard.vida}</span></p>
                <p className="attr ataque">Ataque: <span>{secondCard.ataque}</span></p>
                <p className="attr defensa">Defensa: <span>{secondCard.defensa}</span></p>
              </div>
            </div>
          </div>

          <div className="view-actions">
            <button className="close-btn view-close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
