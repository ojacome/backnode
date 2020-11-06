'use strict'

var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var ArticleController = require('../controllers/article');
var router = express.Router();

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, './upload/articles');

    },

    filename(req, file = {}, cb) {

        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);

        crypto.pseudoRandomBytes(16, function (err, raw) {

            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });

    },

});

var mul_upload = multer({dest: './upload/articles',storage});


router.get('/test', ArticleController.test);


router.get('/:last?', ArticleController.getArticles);//consulta todos o los 5 ultimos
router.get('/article/:id', ArticleController.getArticle);//consulta uno
router.post('/', ArticleController.save);//save
router.put('/article/:id', ArticleController.update);//update
router.delete('/article/:id', ArticleController.delete);//delete

router.post('/upload-image/:id', mul_upload.single('image') , ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);

router.get('/search/:search', ArticleController.search);

module.exports = router;