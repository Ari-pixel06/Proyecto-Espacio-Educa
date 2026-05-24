import { useNavigate } from 'react-router-dom';
import Carta from '../components/Cartas';
import { useCards } from '../contexts/CardsContext';
import './VistaMazo.css';

function VistaMazo() {
  const { cards, selectedIndices, toggleSelectCard, isSelectionMode, setIsSelectionMode, clearSelection } = useCards();
  const navigate = useNavigate();

  const handleSelectionMode = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      clearSelection();
      return;
    }

    setIsSelectionMode(true);
    clearSelection();
    if (cards.length > 0) {
      toggleSelectCard(0);
    }
    if (cards.length > 1) {
      toggleSelectCard(1);
    }
  };

  return (
    <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>
            💀
          </div>
          <h1 className="mh-title">Cartas Monster High</h1>
        </div>
      </header>

      <div className="action-row">
        <button className="add-card-btn" onClick={() => navigate('/add')} aria-label="Agregar carta">
          + Añadir carta
        </button>

        <button
          className="add-card-btn"
          onClick={handleSelectionMode}
          aria-label={isSelectionMode ? 'Cancelar selección' : 'Seleccionar cartas'}
        >
          {isSelectionMode ? 'Cancelar selección' : 'Seleccionar'}
        </button>
      </div>

      <div className="cards-row">
        {cards.map((c, i) => (
          <Carta
            key={i}
            apellido={c.apellido || ''}
            edad={c.edad}
            nombre={c.nombre}
            padres={c.padres || ''}
            habilidad={c.habilidad || ''}
            imagen={c.imagen || ''}
            especie={c.especie || ''}
            className={c.className}
            selected={selectedIndices.includes(i)}
            onClick={() => {
              if (isSelectionMode) {
                toggleSelectCard(i);
                return;
              }
              navigate(`/cards/${i}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default VistaMazo;
