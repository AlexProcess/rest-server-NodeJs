

const validarJWT = require("../middlewares/validar-jwt");
const validaCampos = require("../middlewares/validar-campos");
const ValidaRoles = require("../middlewares/validar-roles");


module.exports = {
    ...validaCampos,
    validarJWT,
    ...ValidaRoles
}