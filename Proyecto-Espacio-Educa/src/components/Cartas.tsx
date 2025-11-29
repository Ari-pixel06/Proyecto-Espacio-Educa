import "./Cartas.css";

type Props = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque?: number;
    defensa?: number;
    descripcion: string;
    imagen: string;
    onClick?: () => void;
    className?: string;
    large?: boolean;
};

function Cartas ({
    ataque = 0,
    defensa = 0,
    descripcion = "Hola",
    imagen,
    nombre = "pikachu",
    numero = 1,
    tipo = "electrico",
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
                {nombre} (#{numero})
            </h3>
            <img src={imagen} alt={nombre} />
            <p>Tipo: {tipo}</p>
            <p>Ataque: {ataque}</p>
            <p>Defensa: {defensa}</p>
            <p>{descripcion}</p>
        </div>
    );
}

export default Cartas;
