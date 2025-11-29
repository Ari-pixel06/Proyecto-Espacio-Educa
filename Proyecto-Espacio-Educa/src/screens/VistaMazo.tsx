import { useEffect, useState } from 'react';
import Carta from '../components/Cartas';
import CardDetail from '../components/card';
import './VistaMazo.css';

type CardData = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque: number;
    defensa: number;
    descripcion: string;
    imagen: string;
};

function VistaMazo() {
    const cards: CardData[] = [
        {
            numero: 1,
            nombre: 'Bulbasaur',
            tipo: 'Planta',
            ataque: 70,
            defensa: 65,
            descripcion: 'Un Pokémon de tipo planta.',
            imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        },
        {
            numero: 7,
            nombre: 'Squirtle',
            tipo: 'Agua',
            ataque: 60,
            defensa: 70,
            descripcion: 'Un Pokémon de tipo agua.',
            imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        }
    ];

    const [selected, setSelected] = useState<CardData | null>(null);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setSelected(null);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="vista-mazo-root">
            <div className="cards-row">
                {cards.map((c) => (
                    <Carta
                        key={c.numero + c.nombre}
                        {...c}
                        onClick={() => setSelected(c)}
                    />
                ))}
            </div>

            {selected && (
                <div className="overlay" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <CardDetail {...selected} />
                        <button className="close-btn" onClick={() => setSelected(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VistaMazo;