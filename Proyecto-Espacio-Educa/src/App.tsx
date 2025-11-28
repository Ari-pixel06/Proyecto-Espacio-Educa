import "./App.css";
import CardDetail from "./components/Cartas";

function App() {
  return (
    <div>
      <CardDetail
         ataque ={55}
         nombre ="Charmander"
         defensa ={40}
         descripcion ="Un Pokémon de tipo fuego."
         imagen ="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
         numero ={4}
         tipo ="Fuego"
      />

      <CardDetail
         ataque ={55}
         nombre ="Charmander"
         defensa ={40}
         descripcion ="Un Pokémon de tipo fuego."
         imagen ="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
         numero ={4}
         tipo ="Fuego"
      />

      <button className= "bg-indigo-400">ola</button>
    </div>
  )
}

export default App;