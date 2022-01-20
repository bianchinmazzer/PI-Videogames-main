import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres} from "../actions";
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
            
            
            <div className="crear-container">
            <form className="formulario" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className="label-genero">Nombre: </label>
                    <input placeholder="Nombre..." className="input-CV" type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    {errors.name ?
                        <p className="error">{errors.name}</p> : null
                }
                </div>
                <div>
                    <label className="label-genero">Descripcion: </label>
                    <input placeholder="Descripcion..." className="input-CV" type="text" value={input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}></input>
                    {errors.descripcion?
                        <p className="error">{errors.descripcion}</p> : null
                    }
                </div>
                <div>
                    <label className="label-genero">Fecha de lanzamiento: </label>
                    <input placeholder="Fecha de lanzamiento..." className="input-CV" type="text" value={input.fechaLanzamiento} name="fechaLanzamiento" onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label className="label-genero">Imagen: </label>
                    <input placeholder="URL de imagen..." className="input-CV" type="text" value={input.img} name="img" onChange={(e)=>handleChange(e)} required/>
                    {errors.img ?
                        <p className="error">{errors.img}</p> : null
                    }
                </div>
                <div>
                    <label className="label-genero">Plataformas: </label>

                    <select  className="input-CV" name="plataformas" onChange={e => handleChange(e)} multiple required>
                    {generos.map((p) => 
                    <option value={p.name}>{p.name}</option>
                    )}
                    
                    </select>
                {errors.plataformas ? 
                        <p className="error">{errors.plataformas}</p> : null
                    }
                </div>
                <label className="label-genero">Generos: </label>
                <select className="input-CV" name="generos" onChange={(e)=>handleChange(e)}>
                    {generos.map((g) => 
                    <option value={g.name}>{g.name}</option>
                    )}
                </select>
                {errors.genero?
                        <p className="error">{errors.genero}</p> : null
                    }
                <ul><li>{input.genero.map(g => g + ", ")}</li></ul>
            {input.genero.map(g => 
                <div className="arregloGenero">
                    <p>{g}</p> <button className="boton-cerrar" onClick={()=>handleDelete(g)}>X</button>
                </div>
                )}
                <button className="boton-crearVg" type="submit">Crear Videojuego</button> 
                <br/>
                <Link to="/home"><button className="botonVolver-CV">Volver</button></Link>
            </form>
                </div>
                
        </div>
    )
} 