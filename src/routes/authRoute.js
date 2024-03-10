const express = require("express");

// 
route = express.Router()

// Route handler for /auth/user
route.get('/', (req, res) => {
  // Handle the request here, such as rendering a user dashboard
  res.render('auth/login'); // Example response, replace with your logic
});

route.get('/register', (req, res) => {
    // Handle the request here, such as rendering a user dashboard
    res.render('auth/register'); // Example response, replace with your logic
  });

module.exports=route

