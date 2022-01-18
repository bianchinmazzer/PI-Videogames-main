import axios from "axios";
const URL_GET = " http://localhost:3001/videogames";

export function getVideogames() {
    return async function(dispatch) {
    var pedido  =  await axios.get(URL_GET)
       
        dispatch({
            type: "GET_VIDEOGAMES",
            payload: pedido.data
       
        })
    }
}

export function getNameVideogames(payload) {
    return async function(dispatch) {
        try {
            var name = await axios.get("http://localhost:3001/videogames?name=" + payload);
            return dispatch({
                type: "GET_NAME_VIDEOGAME",
                payload: name.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGenres() {
    return async function(dispatch) {
        var generos = await axios.get("http://localhost:3001/generos");
        return dispatch({
            type: "GET_GENEROS",
            payload: generos.data
        })
    }
}

export function postVideogame(payload) {
    return async function() {
        var vg = await axios.post(" http://localhost:3001/createvideogame", payload)
        return vg
    }
}

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function filterGenero(payload) {
    return{
        type: "FILTER_GENERO",
        payload
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}

export function getDetails(id) {
    return async function(dispatch) {
        try {
            var detail = await axios.get(`http://localhost:3001/videogame/${id}`);
            return dispatch({
                type: "GET_DETAILS",
                payload: detail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}