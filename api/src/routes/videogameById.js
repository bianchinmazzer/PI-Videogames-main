const { Router } = require("express");
const router = Router();
const {getVideoGameById} = require("../controllers/Videogames.js");

router.get("/:id", getVideoGameById)

module.exports = router;