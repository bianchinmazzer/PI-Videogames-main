const { Router } = require("express");
const router = Router();
const {getAllVideogames} = require("../controllers/Videogames.js")



router.get("/", getAllVideogames)


module.exports = router;