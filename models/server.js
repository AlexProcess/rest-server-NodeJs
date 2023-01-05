const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';    

        //middlewares
        this.middlewares();
        //routes from my app
        this.routes();
    }

    middlewares() {
        //CORS 
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
        
        //express
        this.app.use(express.static(this.usuariosPath));
        

        //directory public
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server listening on port`, this.port
            

            );
        });
    }

}


module.exports = Server;