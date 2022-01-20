import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { getVideogames, filterCreated, orderByName, orderByRating, getGenres, filterGenero } from "../actions/index.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "./Card.js";
import Paginado from "./Paginado.js";
import SearchBar from "./SearchBar.js";
import "./components.css" 
import { IoGameControllerOutline } from "react-icons/io5";

export default function Home() {

const dispatch = useDispatch()
const videogames = useSelector((state) => state.videogames)
const generos = useSelector((state) => state.generos)

// eslint-disable-next-line
const [orden, setOrden] = useState("")
const [currentPage, setCurrentPage] = useState(1)
const [videogamesPerPage] = useState(15)
const indexOfLastVideogame = currentPage * videogamesPerPage
const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(()=>{
    dispatch(getVideogames())
    }, [dispatch]) 

useEffect(()=>{
dispatch(getGenres())
}, [dispatch]) 

function handleClick(e){
e.preventDefault();
dispatch(getVideogames())
}
function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1);
    setOrden(`rating ${e.target.value}`)
}
function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`)
}
function handleGenero(e) {
    e.preventDefault();
    dispatch(filterGenero(e.target.value))
    // setCurrentPage(1)
    setOrden(e.target.value)
}

function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
}
    console.log(videogames)


    return(
       
       

    <div className="home">
        <br/>
        <br/>
        <br/>
        <br/>
        <SearchBar/>
       
        <Link to="videogame">
            <button className="boton-crear">Crear videojuego</button>
            </Link>
            
        <button className="boton-cargar" onClick={e=>{handleClick(e)}}>
            Cargar videogames</button>
        <div>
        
                <select className="filtroABC" onChange={e => handleSort(e)}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                </select>
                <select className="filtroVG" onChange={e => handleFilterCreated(e)}>
                <option value="all">Todos</option>
                <option value="created">Creados</option>
                <option value="exst">Existentes</option>
                </select>
                <select className="filtroRating" onChange={e => handleRating(e)}>
                    <option value="ascrat">Rating ascendente</option>
                    <option value="descrat">Rating descendente</option>
                </select>
                <select className="filtroGenero" onChange={e => handleGenero(e)}>
                    <option value="all">Todos</option>
                    {generos?.map((g) => 
                    <option onClick={(e)=>handleClick(e)} value={g.name} key={g.id}>{g.name}</option>
                    )}
                </select>
        </div>
    <div >
        
        {videogames.length === 0 ?
         <>
         <br/>
         <br/>
         <br/>
       
         <h1 className="icon-loader"><IoGameControllerOutline /></h1>
         <h2 className="loading">Loading...</h2>
     
        </> :
       <div className="cards">
        {currentVideogames?.map(vg => 
            <div key={vg.id} className="card">
            <Card id={vg.id} name={vg.name} img={vg.img} genero={vg.generos}/>
            </div>
            )}
        </div>}
    </div>
   <Paginado
videogamesPerPage={videogamesPerPage}
videogames={videogames.length}
paginado={paginado}
/>
        </div>
   
)}