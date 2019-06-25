var express = require('express');
var router = express.Router();
var path = require('path');

const entry = path.resolve('./public/game/index.html');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(entry);
});

module.exports = router;