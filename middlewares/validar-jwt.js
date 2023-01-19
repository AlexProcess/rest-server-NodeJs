const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "token no valido - usuario no existe en la DB",
      });
    }

    // Verificar si el uid tiene el estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "token no valido - usuario con estado false",
      });
    }

    req.usuario = usuario;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
  
  next();
};

module.exports = validarJWT;
