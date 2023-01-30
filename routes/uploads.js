const { check } = require("express-validator");
const { Router } = require("express");

const { validarCampos } = require("../middlewares/validar-campos");
const { cargarArchivo } = require("../controllers/uploads");

const router = Router();


router.post( '/',  cargarArchivo )


module.exports = router;

