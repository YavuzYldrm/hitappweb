var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/*', function(req, res, next) {
    var z = 'index.html';
    // res.sendFile(path.join(__dirname,'templates','index.html'));
    res.sendFile(z);
});

module.exports = router;