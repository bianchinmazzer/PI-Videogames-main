import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
 
    let errors = {};
    if(input.name === '') {
        errors.name = "Se requiere un nombre"
    } 
    if(input.descripcion === '') {
        errors.descripcion = "Se requiere una descripcion"
    }
    if(input.img === '') {
        errors.img = "Se requiere una URL de imagen"
    }
    if(input.genero.length === 0) {
        errors.genero = "Se requiere al menos elegir un genero"
    }
    if (input.plataformas.length === 0){
        errors.plataformas = "Seleccionar al menos una plataforma."
    }
    return errors
}

export default function VideogameCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const generos = useSelector((state) => state.generos)
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
        name: "",
        descripcion: "",
        img: "",
        fechaLanzamiento: "",
        plataformas: [],
        genero: []
    })

   function handleChange(e) {
       if(e.target.name === 'plataformas'){
            let values = Array.from(e.target.selectedOptions, o => o.value)
            console.log(values)
            setInput({
                ...input,
                plataformas: values
            }) 
            setErrors(validate({
                ...input,
                plataformas: values
            }))
       } else if(e.target.name === 'generos'){
            setInput({
                ...input,
                genero: [...input.genero, e.target.value]
            })
            setErrors(validate({
                ...input,
                genero: [...input.genero, e.target.value]
            }))
       } else {
           setInput({
               ...input,
               [e.target.name] : e.target.value
           })
           setErrors(validate({
               ...input,
               [e.target.name]: e.target.value
           }))
       }
    }


    function handleSubmit(e) {
        e.preventDefault()
        if(!input.name || !input.descripcion || !input.img || !input.genero || !input.plataformas || 
            errors.hasOwnProperty("name") || errors.hasOwnProperty("descripcion") || errors.hasOwnProperty("img") || 
            errors.hasOwnProperty("genero") || errors.hasOwnProperty("plataformas")) {
            
                alert("Faltan campos obligatorios por completar")
        } else {
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
        }

        console.log(errors)
    
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
                    {errors.name ?
                        <p className="error">{errors.name}</p> : null
                }
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}></input>
                    {errors.descripcion?
                        <p className="error">{errors.descripcion}</p> : null
                    }
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input type="text" value={input.fechaLanzamiento} name="fechaLanzamiento" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.img} name="img" onChange={(e)=>handleChange(e)} required/>
                    {errors.img ?
                        <p className="error">{errors.img}</p> : null
                    }
                </div>
                <div>
                    <label>Plataformas:</label>

                    <select name="plataformas" onChange={e => handleChange(e)} multiple required>
                        <option value="PS5">PS5</option>
                        <option value="PS4">PS4</option>
                        <option value="X-BOX">X-BOX</option>
                        <option value="PC">PC</option>
                    </select>
                {errors.plataformas ? 
                        <p className="error">{errors.plataformas}</p> : null
                    }
                </div>
                <select name="generos" onChange={(e)=>handleChange(e)}>
                    {generos.map((g) => 
                    <option value={g.name}>{g.name}</option>
                    )}
                </select>
                {errors.genero?
                        <p className="error">{errors.genero}</p> : null
                    }
                <ul><li>{input.genero.map(g => g + ", ")}</li></ul>
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