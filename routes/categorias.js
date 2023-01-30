const { check } = require("express-validator");
const { Router, response } = require("express");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
  } = require("../controllers/categoria");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

/*
{{url}}/api/categorias
*/

//Obtener todas las categorias

router.get("/", obtenerCategorias);
//Obtener una categorias por id - publico

router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
  ],
  obtenerCategoria
);
//Crear categoria por id - privado - cualquier persona con un token válido

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);
//Actualizar - privado - cualquiera con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);
//Borrar una categoria - admin

router.delete("/:id", 
[
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);

module.exports = router;
