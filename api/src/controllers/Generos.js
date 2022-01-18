const axios = require("axios");
const dotenv = require("dotenv").config();
const { API_KEY } = dotenv.parsed;
const { Genero } = require("../db.js")

const loadGenresDB = async (req, res) => {
    const generosApi = await axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`);
    const generos = generosApi.data.results.map(v => v.name)
    // const generoEach = generos.map(g => {
    //     for(let i=0; i<g.length; i++) return g});
        generos.forEach(g => {
            Genero.findOrCreate({
                where: { name : g }
            })
        }) 
        
}
loadGenresDB();

const getGeneros = async (req, res) => {
    const generosTotal = await Genero.findAll();
    res.send(generosTotal)
}

module.exports = {
    getGeneros
}