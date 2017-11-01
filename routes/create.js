var express = require('express');
var createUtil = require('../utils/creating');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('create', { data: undefined });
});

router.post('/', function (req, res, next) {
    const userData = {
        "category": req.body.category,
        "title": req.body.title,
        "ID": req.body.ID,
        "Description": req.body.Description
    }
    createUtil.create(userData).then((result) => {
        if (result.statusCode == 400) {
            res.statusCode = 400;
            res.render('create', { data: undefined });
        }
        else {
            res.statusCode = 200;
            res.render('create', { data: result });
        }
    }).catch((err) => {
        return err;
    });
});

module.exports = router;