const User = require('../models/User')


const getUser=async(req,res)=>{

    const user = await User.find();
    if(!user){
        res.status(403)
        throw new Error("no user has been found ")
    }
    res.status(200).json({message :user})
}

const createUser=(req,res)=>{
    res.status(200).json({message :"New User  Created successfully"})
}

const updateUser=(req,res)=>{
    res.status(200).json({message :`Updated  User ${req.params.id}`})
}

const deleteUser=(req,res)=>{
    res.status(200).json({message :`delete  User ${req,params.id}`})
}


module.exports={
    getUser,
    createUser,
    updateUser,
    deleteUser
}