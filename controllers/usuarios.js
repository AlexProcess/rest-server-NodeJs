const { response, request } = require('express');



const usuariosGet = (req = request, res = response) => {
    const {q, nombre = "noname", apikey, page = 1, limit } = req.query;
    
    res.json({
        msg: 'GET api desde el controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params.id;
    
    res.json({
        msg: 'PUT api desde el controlador',
        id: 10
    });
}

const usuariosPost = (req, res = response) => {
    
    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST api desde el controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: 'Delete api desde el controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'Patch api desde el controlador'
    });
}

module.exports = {
    usuariosGet, 
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}