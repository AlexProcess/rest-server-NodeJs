const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");


const login = async(req, res = response) => {
  const { correo, password } = req.body;

  try {


    //verificar existencia del email
    const usuario = await Usuario.findOne({ correo });
    if ( !usuario ) {
      return res.status(404).json({
        msg: 'Usuario / Password no son correctos - Correo'
      });
    }

    //Si el usuario esta activo
    if ( !usuario.estado ) {
      return res.status(404).json({
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }
    //Verificar el password
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - Password '
      })
    }

    //generar JWT token
    const token = await generarJWT( usuario.id );
    
    res.json({
      usuario,
      token
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Habla con el administrador",
    });
  }
};

module.exports = {
  login,
};
