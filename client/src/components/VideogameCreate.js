import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";



export default function VideogameCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const generos = useSelector((state) => state.generos)

    const [input, setInput] = useState({
        name: "",
        descripcion: "",
        fechaLanzamiento: "",
        plataformas: [],
        genero: []
    })

   function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleCheck(e) {
        if(e.target.checked) {
            setInput({
                ...input,
                plataformas: [...input.plataformas, e.target.value]
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genero: [...input.genero, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideogame(input))
        alert("Videojuego creado con exito")
        setInput({
            name: "",
            descripcion: "",
            fechaLanzamiento: "",
            plataformas: [],
            genero: []
        })
        history.push("/home")
    }
    function handleDelete(g) {
        setInput({
            ...input,
            genero: input.genero.filter(el => el !== g)
        })
    }

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch]);

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu videojuego</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input type="text" value={input.fechaLanzamiento} name="fechaLanzamiento" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.img} name="img" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Plataformas:</label>
                    <label><input type="checkbox" name="PS5" value="PS5" onChange={(e)=>handleCheck(e)}></input>PS5</label>
                    <label><input type="checkbox" name="PS4" value="PS4" onChange={(e)=>handleCheck(e)}></input>PS4</label>
                    <label><input type="checkbox" name="X-BOX" value="X-BOX" onChange={(e)=>handleCheck(e)}></input>X-BOX</label>
                    <label><input type="checkbox" name="PC" value="PC" onChange={(e)=>handleCheck(e)}></input>PC</label>
                </div>
                <select onChange={(e)=>handleSelect(e)}>
                    {generos.map((g) => 
                    <option value={g.name}>{g.name}</option>
                    )}
                </select>
                <ul><li>{input.genero.map(g => g + " ,")}</li></ul>
                <button type="submit">Crear Videojuego</button>
            </form>
            {input.genero.map(g => 
                <div>
                    <p>{g}</p>
                    <button onClick={()=>handleDelete(g)}>X</button>
                </div>
                )}
        </div>
    )
}