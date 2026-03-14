import { useNavigate } from 'react-router-dom';
import Carta from '../components/Cartas';
import { useCards } from '../contexts/CardsContext';
import './VistaMazo.css';

function VistaMazo() {
  const { cards } = useCards();
  const navigate = useNavigate();

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
            onClick={() => navigate(`/cards/${i}`)}
          />
        ))}
      </div>

      <button className="add-card-btn" onClick={() => navigate('/add')} aria-label="Agregar carta">
        + Añadir carta
      </button>
    </div>
  );
}

export default VistaMazo;
