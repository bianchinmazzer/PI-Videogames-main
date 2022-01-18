import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

   function handleInputChange(e) {
       e.preventDefault()
       setName(e.target.value)
   }
   function handleSubmit(e) {
       e.preventDefault()
       dispatch(getNameVideogames(name))
   }

    return (
        <div className="searchVideogame">
            <input className="inputSearch" type="text" placeholder="Buscar videojuego..." onChange={(e) => handleInputChange(e)} />
            <button className="searchBoton" type="submit" onClick={(e)=>handleSubmit(e)}><IoSearch /></button> 
        </div>
    )
}