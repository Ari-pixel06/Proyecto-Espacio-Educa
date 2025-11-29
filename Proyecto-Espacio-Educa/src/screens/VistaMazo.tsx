import Carta from '../components/Cartas';
import './VistaMazo.css';

function VistaMazo() {
    return (
        <div className="vista-mazo-root">
      <header className="mh-header">
        <div className="mh-logo-wrap">
          <div className="mh-logo-img" aria-hidden>💀</div>
          <h1 className="mh-title">Cartas Monster High</h1>
        </div>

      </header>
            <div className="cards-row">
               <Carta
                 apellido="de Nile"
                 edad={5842}
                 nombre="Cleo"
                 padres="La momia"
                 habilidad="Magia Egipcia"
                 imagen="https://th.bing.com/th/id/R.7cf6b8d21ef735c84d5685a8c6a7b63e?rik=T9bgC%2f8e%2fTCWFA&riu=http%3a%2f%2fimages5.fanpop.com%2fimage%2fphotos%2f28800000%2fCleo-De-Nile-monster-high-28820550-704-1082.jpg&ehk=f%2bmqWFqARVXyEkiKlwt4%2fUODiCe0Hto7ergqJ66F7XA%3d&risl=&pid=ImgRaw&r=0"
                 especie='Momia'
               />

               <Carta
                 apellido="Bominable"
                 edad={16}
                 nombre="Abbey"
                 padres="El Yeti"
                 habilidad="Control del hielo"
                 imagen="https://tse3.mm.bing.net/th/id/OIP.eJisJUinMbmHTK3EQjMFegHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                 especie='Yeti'
               />

               <Carta
                 apellido=""
                 edad={16}
                 nombre="Operetta"
                 padres="Fantasma de la Ópera"
                 habilidad="Canto hipnótico"
                 imagen="https://w0.peakpx.com/wallpaper/163/754/HD-wallpaper-monster-high-monster-high-scaritage-operetta-doll-anime.jpg"
                 especie='Fantasma'
                 className="operetta"
               />
            </div>
        </div>
    );
}

export default VistaMazo;