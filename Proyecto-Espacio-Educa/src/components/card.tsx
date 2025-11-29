type Props = {
    nombre: string;
    apellido: string;
    edad: number;
    padres: string;
    habilidad: string;
    imagen: string;
    especie: string;
};

function CardDetail ({
    nombre,
    apellido,
    edad,
    imagen,
    padres,
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
            <p>Edad: {edad} años</p>
            <p>Padres: {padres}</p>
            <p>{habilidad}</p>
        </div>
    )
}

export default CardDetail;