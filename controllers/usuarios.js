const { response, request } = require("express");
const { validationResult } = require('express-validator')
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");


const usuariosGet = async(req = request, res = response) => {
  //const { q, nombre = "noname", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = {estado: true}

  //const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number( desde ))
      .limit(Number( limite ))
  ]);

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password.toString(), salt);
    
    //generar usuario
    const usuario = await new Usuario({
      nombre,
      correo,
      rol,
      password: encryptedPassword,
    });
    // Guardar en DB
    
    await usuario.save();

    res.json({
      usuario
    });
  }

const usuariosPut = async(req, res = response) => {

  const { id } = req.params;
  const {_id, password, google, correo, ...resto} = req.body;

  //Validar contra la base de datos
  if (password) {
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
    
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto, {new:true} );

  res.json({
    msg: "PUT api desde el controlador",
    id,
    usuario
  });
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch api desde el controlador",
  });
};
    
const usuariosDelete = async(req, res = response) => {
  const { id } = req.params;

  //fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});

  res.json(usuario);
};


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
