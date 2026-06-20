import "./Cartas.css";

type Props = {
    apellido: string;
    nombre: string;
    vida: number;
    ataque: number;
    defensa: number;
    habilidad: string;
    especie: string;
    imagen: string;
    onClick?: () => void;
    className?: string;
    large?: boolean;
    selected?: boolean;
};

function Cartas ({
    apellido = "de Nile",
    vida = 100,
    ataque = 0,
    defensa = 0,
    imagen,
    nombre = "pikachu",
    habilidad = "electricidad",
    especie = "electrico",
    onClick,
    className,
    large = false,
    selected = false,
}: Props) {
    return (
        <div
            className={["card", large ? "card-large" : "", className || "", selected ? "selected" : ""].join(" ")}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
        >
            <h3>
                {nombre} {apellido}
            </h3>
            
            <img src={imagen} alt={nombre} />
            <div className="card-body">
                <div>
                    <p className="attr especie">Especie: <span>{especie}</span></p>
                    <p className="attr vida">Vida: <span>{vida}</span></p>
                </div>
                <div>
                    <p className="attr ataque">Ataque: <span>{ataque}</span></p>
                    <p className="attr defensa">Defensa: <span>{defensa}</span></p>
                    <p className="attr habilidad">Habilidad: <span>{habilidad}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Cartas;
