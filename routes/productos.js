const { check } = require("express-validator");
const { Router, response } = require("express");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  obtenerProducto,
  borrarProducto
  } = require("../controllers/productos");

const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

//Obtener todos los productos

router.get("/", obtenerProductos);

//Obtener un Producto por id - publico
router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom( existeProductoPorId ),
  ],
  obtenerProducto
);
//Crear Producto por id - privado - cualquier persona con un token válido

router.post('/', [ 
  validarJWT,
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('categoria','No es un id de Mongo').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
], crearProducto );
//Actualizar - privado - cualquiera con un token valido

router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un id de mongo").isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos,
  ],
  actualizarProducto
);
//Borrar una producto - admin

router.delete("/:id", 
[
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);

module.exports = router;
