const express = require('express');


module.exports=function(app){
    app.get('/general', (req, res, next)=>{
        res.render('pages/general', { title: 'Express' });
    });

    app.get('/general/john', (req, res, next)=>{
        res.render('pages/general', {title: 'John Mendoza '});
    });
};

