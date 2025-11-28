import Carta from '../components/Cartas';

function VistaMazo() {
    return (
        <div>
           <Carta
           numero={1}
           ataque={70}
           nombre="Bulbasaur"
           defensa={65}
           descripcion="Un Pokémon de tipo planta."
           imagen="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
           tipo='planta'
           />


           <Carta
           numero={1}
           ataque={70}
           nombre="Bulbasaur"
           defensa={65}
           descripcion="Un Pokémon de tipo planta."
           imagen="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
           tipo='agua'
           />
        </div>
    );
}

export default VistaMazo;