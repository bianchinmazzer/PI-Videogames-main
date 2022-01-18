const { Router } = require("express");
const router = Router();
const {getGeneros} = require("../controllers/Generos.js");

router.get("/", getGeneros);

module.exports = router;