
const express = require('express');
const { getUser, createUser, updateUser, deleteUser } = require('../Controllers/UserController');

route = express.Router()

//get me 
route.get('/show',getUser)


//create new user 
route.post('/create',createUser)


//update users
route.put('/update/:id',updateUser)



//delete users
route.delete('/delete/:id',deleteUser)


module.exports=route

