const { Router } = require('express');
const videogames = require("./videogames.js");
const createvideogame = require("./createvideogame")
const videogameById = require("./videogameById.js");
const generos = require("./generos");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/createvideogame", createvideogame)
router.use("/videogame", videogameById)
router.use("/generos", generos)


module.exports = router;
