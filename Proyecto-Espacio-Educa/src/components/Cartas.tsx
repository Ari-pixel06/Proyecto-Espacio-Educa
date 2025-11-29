import "./Cartas.css";

type Props = {
    apellido: string;
    nombre: string;
    edad: number;
    padres: string;
    habilidad: string;
    especie: string;
    imagen: string;
    onClick?: () => void;
    className?: string;
    large?: boolean;
};

function Cartas ({
    apellido = "de Nile",
    edad = 1,
    padres = "Hola",
    imagen,
    nombre = "pikachu",
    habilidad = "electricidad",
    especie = "electrico",
    onClick,
    className,
    large = false,
}: Props) {
    return (
        <div
            className={["card", large ? "card-large" : "", className || ""].join(" ")}
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
                    <p className="attr edad">Edad: <span>{edad} años</span></p>
                </div>
                <div>
                    <p className="attr padres">Padres: <span>{padres}</span></p>
                    <p className="attr habilidad">Habilidad: <span>{habilidad}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Cartas;
