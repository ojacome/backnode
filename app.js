'use strict'

//cargar módulos para crear el servido
var express = require('express');
var bodyParser = require('body-parser');

//cargar express
var app = express();

//cargar ficheros para rutas
var article_routes = require('./routes/article')

//cargar middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//activar el CORS IMPORTANTE para peticiones mediante ajax o angular
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas
app.use('/api/articles', article_routes);

//ruta de prueba para el APIREST
app.get('/api/test', function( req, res ){
    
    console.log('Conexion con APIREST exitosa.');

    return res.status(200).send({
        title: 'API RESTFUL con node y express.js',
        autor: 'Jesús Jácome.'        
    });
})

//exportar modulo (fichero actual)
module.exports = app;