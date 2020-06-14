'use strict'

var validator = require('validator');
var Article = require('../models/article')

var controller = { 

    test: ( req, res ) => {            
    
        return res.status(200).send({
            message : 'Mensaje de controllador de articulos'        
        });
    },

    save: ( req, res ) => {        
        //recoger parámetros
        var params = req.body;
        
        //validar datos
        try{

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);


        }catch(err){

            return res.status(500).send({
                status: 'error',
                message: 'faltan datos por enviar' 
            });
        }

        if(validate_title && validate_content){
           
            //crear objeto a guardar
            var article = new Article();

            //asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //guardar el articulo
            article.save((err, articleStored) => {
                
                // devolver respuesta        
                if(err || !articleStored){

                    return res.status(404).send({
                        status: 'error',
                        message: 'Error al guardar artículo'
                    });
                }

                
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

        }
        else{

            return res.status(500).send({
                status: 'error',
                message : 'El title y content son requeridos' 
            });
        }

    },

    getArticles: ( req, res ) => {     
        
        var query = Article.find({});
        
        var last = req.params.last;
        if(last || last != undefined){
            
            query.limit(5);
        }

        query.sort('-_id').exec((err, articles) => {

            if(err){

                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener los artículos'  
                });
            }

            if(!articles){

                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontraron registros'  
                });
            }

            return res.status(200).send({
                status: 'success',
                articles       
            });
        });

    },

    getArticle: ( req, res ) => {     
        
        //obtener el id
        var articleId = req.params.id;

        //validar
        if(!articleId || articleId == null){

            return res.status(404).send({
                status: 'error',
                message: 'El id del articulo es requerido.'  
            });
        }


        
        Article.findById(articleId, (err , article) => {           

            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: `No existe artículo con id ${articleId}` 
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });
        });
        

    },

    update: ( req, res ) => {     
        
        //obtener el id
        var articleId = req.params.id;

        //recoger los datos
        var params = req.body;

        //validar
        if(!articleId || articleId == null){

            return res.status(404).send({
                status: 'error',
                message: 'El id del articulo es requerido.'  
            });
        }

        try{

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){

            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos por enviar.' 
            });
        }

        if(validate_content && validate_title){

            Article.findOneAndUpdate({_id: articleId}, params, { new: true }, (err, articleUpdated) =>{
                
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar' 
                    });
                }


                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: `No existe el artículo con id ${articleId}`
                    });
                }


                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }
        else{
            return res.status(500).send({
                status: 'error',
                message: 'El title y content son requeridos' 
            });
        }

    },

    delete: ( req, res ) => {     
        
        //obtener el id
        var articleId = req.params.id;

        Article.findOneAndDelete({_id: articleId}, (err, articleDeleted) =>{
            

            if(!articleDeleted || err){
                return res.status(404).send({
                    status: 'error',
                    message: `Error al eliminar el artículo con id ${articleId}`
                });
            }
            

            return res.status(200).send({
                status: 'success',
                article: articleDeleted
            });
        });

    },
};

module.exports = controller;