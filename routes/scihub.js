var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var url = require('url');

/* GET home page. */

router.get('/', (req, res, next) => {
    var str = req.query.busqueda;
    console.log(str);
    
    if (str.length == '')
    var pagina = 'https://sci-hub.tw/'+str;
        res.send(pagina);
});


module.exports = router;