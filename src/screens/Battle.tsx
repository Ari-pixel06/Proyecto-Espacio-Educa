import { useLocation, useNavigate } from 'react-router-dom';
import { useCards } from '../contexts/CardsContext';
import Cartas from '../components/Cartas';
import { useState, useEffect } from 'react';
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

  const [life1, setLife1] = useState(firstCard.vida);
  const [life2, setLife2] = useState(secondCard.vida);
  const [turn, setTurn] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const [battleOver, setBattleOver] = useState(false);

  useEffect(() => {
    setLife1(firstCard.vida);
    setLife2(secondCard.vida);
    setTurn(1);
    setLog([]);
    setBattleOver(false);
  
  }, [selected.join(',' )]);

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

  if (battleOver) {
    const winnerCard = life1 <= 0 ? secondCard : firstCard;

    return (
      <div className="vista-mazo-root">
        <header className="mh-header">
          <div className="mh-logo-wrap">
            <div className="mh-logo-img" aria-hidden>
              🏆
            </div>
            <h1 className="mh-title">Victoria</h1>
          </div>
        </header>
        <div className="winner-screen">
          <div className="winner-screen-inner">
            <div className="winner-screen-image">
              <img src={winnerCard.imagen || ''} alt={winnerCard.nombre} />
            </div>
            <div className="winner-screen-actions">
              <button className="next-turn-btn" onClick={() => {
                setLife1(firstCard.vida);
                setLife2(secondCard.vida);
                setTurn(1);
                setLog([]);
                setBattleOver(false);
              }}>
                Reiniciar batalla
              </button>
              <button className="close-btn view-close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
            </div>
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

          <div className="overlay battle-overlay" role="dialog" aria-modal="true">
        <div className="view-modal battle-modal">
          <div className="battle-header">
            <h2>Primera carta vs Segunda carta</h2>
            <p>Elige a tu favorita y compara sus estadísticas.</p>
          </div>
          <div className="battle-grid">
            <div className={`battle-side ${life1 > life2 ? 'winner' : ''}`}>
              <Cartas
                apellido={firstCard.apellido || ''}
                nombre={firstCard.nombre}
                vida={life1}
                ataque={firstCard.ataque}
                defensa={firstCard.defensa}
                compact
                habilidad={firstCard.habilidad || ''}
                especie={firstCard.especie || ''}
                imagen={firstCard.imagen || ''}
              />
              <div className="battle-attrs">
                <p className="attr vida">Vida: <span>{life1}</span></p>
                <p className="attr ataque">Ataque: <span>{firstCard.ataque}</span></p>
                <p className="attr defensa">Defensa: <span>{firstCard.defensa}</span></p>
              </div>
            </div>

            <div className="vs-badge">VS</div>

            <div className={`battle-side ${life2 > life1 ? 'winner' : ''}`}>
              <Cartas
                apellido={secondCard.apellido || ''}
                nombre={secondCard.nombre}
                vida={life2}
                ataque={secondCard.ataque}
                defensa={secondCard.defensa}
                compact
                habilidad={secondCard.habilidad || ''}
                especie={secondCard.especie || ''}
                imagen={secondCard.imagen || ''}
              />
              <div className="battle-attrs">
                <p className="attr vida">Vida: <span>{life2}</span></p>
                <p className="attr ataque">Ataque: <span>{secondCard.ataque}</span></p>
                <p className="attr defensa">Defensa: <span>{secondCard.defensa}</span></p>
              </div>
            </div>
          </div>

          <div className="view-actions" style={{alignItems: 'center'}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
              <button className="next-turn-btn" onClick={() => {
                if (battleOver) return;
                const attackerIndex = (turn % 2 === 1) ? 0 : 1;
                const attacker = attackerIndex === 0 ? firstCard : secondCard;
                const defender = attackerIndex === 0 ? secondCard : firstCard;
                const defenderLife = attackerIndex === 0 ? life2 : life1;
                const rawDamage = Math.max(0, (attacker.ataque ?? 0) - (defender.defensa ?? 0));
                const damage = Math.min(rawDamage, defenderLife);

                // apply damage
                let newLife1 = life1;
                let newLife2 = life2;
                if (attackerIndex === 0) {
                  newLife2 = Math.max(0, life2 - damage);
                  setLife2(newLife2);
                } else {
                  newLife1 = Math.max(0, life1 - damage);
                  setLife1(newLife1);
                }

                if (damage > 0) {
                  setLog(l => [...l, `Turno ${turn}: ${attacker.nombre} ataca a ${defender.nombre} y causa ${damage} de daño (Ataque ${attacker.ataque} - Defensa ${defender.defensa}).`]);
                } else {
                  setLog(l => [...l, `Turno ${turn}: ${attacker.nombre} ataca a ${defender.nombre} pero no causa daño (Ataque ${attacker.ataque} - Defensa ${defender.defensa}).`]);
                }

                if (newLife1 <= 0 || newLife2 <= 0) {
                  setBattleOver(true);
                  const winner = newLife1 <= 0 ? secondCard.nombre : firstCard.nombre;
                  setLog(l => [...l, `¡${winner} gana la batalla!`]);
                }

                setTurn(t => t + 1);
              }}>Siguiente turno</button>
              <button className="close-btn view-close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
            </div>

            <div style={{marginLeft: 12, color: 'rgba(255,255,255,0.9)'}}>
              <div><strong>Turno:</strong> {turn}{battleOver ? ' (Finalizado)' : ''}</div>
            </div>
          </div>

          <div className="battle-log" aria-live="polite">
            {log.length === 0 ? <p style={{opacity: 0.8}}>Presiona "Siguiente turno" para empezar la narración.</p> : (
              <ul>
                {log.slice().reverse().map((line, idx) => (
                  <li key={idx} style={{marginBottom: 6}}>{line}</li>
                ))}
              </ul>
            )}
          </div>
          {battleOver && (
            <div className="winner-screen">
              <div className="winner-screen-image">
                <img
                  src={life1 <= 0 ? secondCard.imagen : firstCard.imagen}
                  alt={life1 <= 0 ? secondCard.nombre : firstCard.nombre}
                />
              </div>
              <div className="winner-screen-actions">
                <button className="next-turn-btn" onClick={() => {
                  setLife1(firstCard.vida);
                  setLife2(secondCard.vida);
                  setTurn(1);
                  setLog([]);
                  setBattleOver(false);
                }}>Reiniciar batalla</button>
                <button className="close-btn view-close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Battle;
