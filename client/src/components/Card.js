import React from "react"
import { Link } from "react-router-dom";

export default function Card(props) {
    return (
        <div key={props.id}>
             <Link to={`/details/${props.id}`}>
            <h3 className="nameCard">{props.name}</h3>
            </Link>
            <img className="imgCard" src={props.img} alt="Not found"/>
            <h5 className="generosCard">{props.genero?.map(g=><ul key={g.id}>{g.name}</ul>)}</h5>
        </div>
    )
}