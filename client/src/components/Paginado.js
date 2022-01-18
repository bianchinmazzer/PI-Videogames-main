/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Paginado({videogamesPerPage, videogames, paginado}) {
    const pageNumbers = []

    for(let i=1; i<=Math.ceil(videogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div className="paginadoContainer">
        <nav  className="paginado">
            <ul className="numPaginado">
                {pageNumbers && pageNumbers.map(number => 
                  <a onClick={()=> paginado(number)} key={number}>{number}</a>
                  )}
            </ul>
        </nav>
        </div>
    )
}