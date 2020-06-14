'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

router.get('/test', ArticleController.test);


router.get('/:last?', ArticleController.getArticles);//consulta todos o los 5 ultimos
router.get('/article/:id', ArticleController.getArticle);//consulta uno
router.post('/', ArticleController.save);//save
router.put('/article/:id', ArticleController.update);//update
router.delete('/article/:id', ArticleController.delete);//delete



module.exports = router;