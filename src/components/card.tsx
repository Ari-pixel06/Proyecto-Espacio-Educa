type Props = {
    nombre: string;
    apellido: string;
    vida: number;
    ataque: number;
    defensa: number;
    habilidad: string;
    imagen: string;
    especie: string;
};

function CardDetail ({
    nombre,
    apellido,
    vida,
    imagen,
    ataque,
    defensa,
    habilidad,
    especie,
}: Props) {
    return (
        <div>
            <h3>
                {nombre} {apellido}
            </h3>
            <img src={imagen} alt={nombre} />
            <p>Especie: {especie}</p>
            <p>Vida: {vida}</p>
            <p>Ataque: {ataque}</p>
            <p>Defensa: {defensa}</p>
            <p>{habilidad}</p>
        </div>
    )
}

export default CardDetail;