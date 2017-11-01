var express = require('express');
var deleteUtil = require('../utils/deleting')
var validatorUtil = require('../utils/validating');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('delete', { data: undefined });
});

router.post('/', function (req, res, next) {
    validatorUtil.idValidator(req.body.ID);

    deleteUtil.delete(req.body.ID).then((result) => {
        if (result == req.body.ID) {
            res.render('delete', { data: result, res: 200 });
        }
        else {
            res.render('delete', { data: 'Invalid ID', res: 400 });
        }
    });
});

module.exports = router;