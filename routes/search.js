var express = require('express');
var searchUtil = require('../utils/searching');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('search', { data: undefined });
});

router.post('/', function (req, res, next) {
    const category = req.body.category;
    const text = req.body.text;

    searchUtil.search(category, text).then((articles) => {
        if (articles.length != 0) {
            let result = articles.map((eachArticle) => {
                return eachArticle._source;
            });
            res.sendStatus = 200;
            res.render('search', { data: result });
        }
        else {
            let result = articles;
            res.statusCode = 500;
            res.render('search', { data: result });
        }
    }).catch((err) => {
        return err;
    });
});

module.exports = router;