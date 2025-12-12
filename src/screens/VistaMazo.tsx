import React, { useState } from 'react';
import Carta from '../components/Cartas';
import './VistaMazo.css';

type CardData = {
  apellido?: string;
  nombre: string;
  edad: number;
  padres?: string;
  habilidad?: string;
  especie?: string;
  imagen?: string;
  className?: string;
};

function VistaMazo() {
  const [cards, setCards] = useState<CardData[]>([
    {
      apellido: 'de Nile',
      edad: 5842,
      nombre: 'Cleo',
      padres: 'La momia',
      habilidad: 'Magia Egipcia',
      imagen:
        'https://th.bing.com/th/id/R.7cf6b8d21ef735c84d5685a8c6a7b63e?rik=T9bgC%2f8e%2fTCWFA&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f28800000%2fCleo-De-Nile-monster-high-28820550-704-1082.jpg&ehk=f%2bmqWFqARVXyEkiKlwt4%2fUODiCe0Hto7ergqJ66F7XA%3d&risl=&pid=ImgRaw&r=0',
      especie: 'Momia',
    },
    {
      apellido: 'Bominable',
      edad: 16,
      nombre: 'Abbey',
      padres: 'El Yeti',
      habilidad: 'Control del hielo',
      imagen:
        'https://tse3.mm.bing.net/th/id/OIP.eJisJUinMbmHTK3EQjMFegHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      especie: 'Yeti',
    },
    {
      apellido: '',
      edad: 16,
      nombre: 'Operetta',
      padres: 'Fantasma de la Ópera',
      habilidad: 'Canto hipnótico',
      imagen:
        'https://w0.peakpx.com/wallpaper/163/754/HD-wallpaper-monster-high-monster-high-scaritage-operetta-doll-anime.jpg',
      especie: 'Fantasma',
      className: 'operetta',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    padres: '',
    habilidad: '',
    especie: '',
    imagen: '',
  });

  function openModal() {
    setForm({ nombre: '', apellido: '', edad: '', padres: '', habilidad: '', especie: '', imagen: '' });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newCard: CardData = {
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
    setCards((prev) => [newCard, ...prev]);
    setShowModal(false);
  }

  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  function openView(card: CardData) {
    setSelectedCard(card);
  }

  function closeView() {
    setSelectedCard(null);
  }

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
            onClick={() => openView(c)}
          />
        ))}
      </div>

      <button className="add-card-btn" onClick={openModal} aria-label="Agregar carta">
        + Añadir carta
      </button>

      {showModal && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Añadir carta</h2>
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
                <button type="button" className="close-btn" onClick={closeModal} style={{ background: '#666' }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCard && (
        <div className="overlay" role="dialog" aria-modal="true" onClick={closeView}>
          <div className="view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="view-content">
              <div className="view-image">
                <img src={selectedCard.imagen} alt={selectedCard.nombre} />
              </div>
              <div className="view-attrs">
                <div>
                  <h3>{selectedCard.nombre} {selectedCard.apellido}</h3>
                  <p className="attr especie">Especie: <span>{selectedCard.especie}</span></p>
                  <p className="attr edad">Edad: <span>{selectedCard.edad} años</span></p>
                  <p className="attr padres">Padres: <span>{selectedCard.padres}</span></p>
                  <p className="attr habilidad">Habilidad: <span>{selectedCard.habilidad}</span></p>
                </div>
                <button className="close-btn view-close-btn" onClick={closeView} aria-label="Cerrar">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaMazo;