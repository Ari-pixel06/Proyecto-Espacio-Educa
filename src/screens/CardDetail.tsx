import { useNavigate, useParams } from 'react-router-dom';
import { useCards } from '../contexts/CardsContext';
import './VistaMazo.css';

function CardDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { cards } = useCards();

  const index = cardId ? Number(cardId) : NaN;
  const card = Number.isFinite(index) ? cards[index] : undefined;

  if (!card) {
    return (
      <div className="vista-mazo-root">
        <header className="mh-header">
          <div className="mh-logo-wrap">
            <div className="mh-logo-img" aria-hidden>
              💀
            </div>
            <h1 className="mh-title">Carta no encontrada</h1>
          </div>
        </header>
        <div style={{ padding: 32 }}>
          <p>No se encontró la carta solicitada.</p>
          <button className="close-btn" onClick={() => navigate('/')}>Volver al mazo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>
            💀
          </div>
          <h1 className="mh-title">Detalle de la carta</h1>
        </div>
      </header>

      <div className="overlay" role="dialog" aria-modal="true">
        <div className="view-modal">
          <div className="view-content">
            <div className="view-image">
              <img src={card.imagen} alt={card.nombre} />
            </div>
            <div className="view-attrs">
              <div>
                <h3>
                  {card.nombre} {card.apellido}
                </h3>
                <p className="attr especie">
                  Especie: <span>{card.especie}</span>
                </p>
                <p className="attr edad">
                  Edad: <span>{card.edad} años</span>
                </p>
                <p className="attr padres">
                  Padres: <span>{card.padres}</span>
                </p>
                <p className="attr habilidad">
                  Habilidad: <span>{card.habilidad}</span>
                </p>
              </div>
              <button className="close-btn view-close-btn" onClick={() => navigate('/')} aria-label="Cerrar">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
