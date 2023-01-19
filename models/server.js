const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../Database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();
        //routes from my app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server listening on port`, this.port
            

            );
        });
    }

}


module.exports = Server;