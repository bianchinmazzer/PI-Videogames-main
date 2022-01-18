const axios = require("axios");
const dotenv = require("dotenv").config();
const { API_KEY } = dotenv.parsed;
const { Videogame, Genero } = require("../db.js");
 

const getAllVideogames = async(req,res) => {
    let videogameData = [];
    const pages = [`https://api.rawg.io/api/games?key=${API_KEY}`];
    try {
        for(let i=0; i < 5; i++) {
        
            const APIvideogames = await axios.get(`${pages[i]}`)
            pages.push(APIvideogames.data.next);  
       
        const apiInfo = await APIvideogames.data.results.map((game) => {
            let formatedGame = {
                id: game.id,
                img: game.background_image,
                name: game.name,
                genero: game.genres.map(g => g),
                rating: game.rating
            }
            return formatedGame;
        });
        videogameData = videogameData.concat(apiInfo)
        }
         const dbInfo = await Videogame.findAll({
            include: {
                model: Genero,
                attibutes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
    
        videogameData = videogameData.concat(dbInfo);
        const name = req.query.name
        if(name) {
            let videogameName = videogameData.filter(v => v.name.toLowerCase().includes(name.toLowerCase()));
            videogameName.length ?
            res.status(200).send(videogameName) :
            res.status(404).send("No se encontro el videojuego")
        } else {
            res.status(200).send(videogameData)
            }
    } catch (error) {
        console.log(error)
    }
}

const getVideoGameById = async(req, res) => {
    const id = req.params.id;

  if (id.includes("-")) {
    try {
      const game = await Videogame.findByPk(id, {
        include: {
            model: Genero,
            attibutes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
      return res.status(200).send(game);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      let platforms = data.platforms.map((p) => {
          return p.platform.name
      })
      let game = {
        id: data.id,
        name: data.name,
        descripcion: data.description,
        fechaLanzamiento: data.released,
        img: data.background_image,
        rating: data.rating,
        genero: data.genres, 
        plataformas: platforms
      };
      return res.status(200).send(game);
    } catch (error) {
      console.log(error);  
    }
  }
} 



const createVideogame = async (req, res) => {
    const { name, descripcion, fechaLanzamiento, img, rating, plataformas, genero, createdInDb } = req.body

    const videogameCreated = await Videogame.create({
        name,
        descripcion,
        fechaLanzamiento,
        rating,
        img,
        plataformas,
        genero,
        createdInDb
    })

    const generoDb = await Genero.findAll({
        where: { name : genero}
    })

    videogameCreated.addGenero(generoDb)
    res.send("Videojuego creado con exito")
}


module.exports = {
    getAllVideogames,
    createVideogame,
    getVideoGameById
}