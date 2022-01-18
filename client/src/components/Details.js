import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index.js";

export default function Details(props) {
    const dispatch = useDispatch()
    const myVideogame = useSelector((state) => state.details)
    
    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    }, )

    console.log(myVideogame)

    return (
        <div className="detailContainer">
        <div>
            <h2 className="detailName">{myVideogame.name}</h2>
            <div>
                <img className="detailImg" src={myVideogame.img} alt="Not found"/>
                <h3 className="generosDetail">Generos: {myVideogame.genero?.map(g => g.name + ", ")}</h3>
                <p className="descripcionDetail">Descripcion:{myVideogame.descripcion}</p>
                <h4 className="fechaDetail">Fecha de lanzamiento:{myVideogame.fechaLanzamiento}</h4>
                <h3 className="ratingDetail">Rating:{myVideogame.rating}</h3>
                <h3 className="plataformasDetail">Plataformas: {myVideogame.plataformas?.map(p=>p + ", ")}</h3>
            </div>
            <Link to="/home">
                <button className="botonDetail">volver</button>
            </Link>
        </div>
        </div>
    )
}