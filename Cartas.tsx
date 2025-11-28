import "./Cartas.css";
type Props = {
    numero: string;
    nombre: string;
    tipo: string;
    ataque?: number;
    defensa?: number;
    descripcion: string;
    imagen: string;
};

function Cartas ({
    ataque = 0,
    defensa = 0,
    descripcion = "Sin descripción",
    imagen,
    nombre = "Sin nombre",
    numero = "000",
    tipo = "Desconocido",
}: Props) {
    return (
        <div>
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