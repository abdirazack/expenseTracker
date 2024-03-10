
const express = require('express');

route = express.Router()

//
route.get('/',(req,res)=>{

    res.render('user/index')

})
route.post('/create',(req,res)=>{
    res.redirect()
})