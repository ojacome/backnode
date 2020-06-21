'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/articles'});

router.get('/test', ArticleController.test);


router.get('/:last?', ArticleController.getArticles);//consulta todos o los 5 ultimos
router.get('/article/:id', ArticleController.getArticle);//consulta uno
router.post('/', ArticleController.save);//save
router.put('/article/:id', ArticleController.update);//update
router.delete('/article/:id', ArticleController.delete);//delete

router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);

router.get('/search/:search', ArticleController.search);

module.exports = router;