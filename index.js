'use strict' //buenas practicas

var moongose = require('mongoose');
var app = require('./app');
var port = 3900;

moongose.set('useFindAndModify', false);//desactivar las funciones obsoletas
moongose.Promise = global.Promise;//minimizar errores
moongose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true, useUnifiedTopology: true})
    
    .then(()=>{

        console.log('Conectado a MongoDB');

        //crear servidor y escuchar peticiones http
        app.listen(port, () =>{

            console.log('Servidor corriendo en http://localhost:'+port);
        });

}).catch((err)=>{
    console.log('Error al conectar MongoDB: '+err);
});