const express =require("express");
const router = express.Router();
const User =require("../models/User");
const bcrypt=require('bcryptjs');
const config =require('config');
const jwt =require('jsonwebtoken');


router.post('/',(req,res)=>{
const{email,password}=req.body;
if(!email||!password)
{return res.status(400).json({msg:'Please enter all filels'});}

User.findOne({email})
.then(user=>{
    if(user) return res.status(400).json({msg:'user already exists'});
    const newUser = new User({
      email,
      password  
    });
    bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(newUser.password,salt,(err,hash)=>{
         if(err)  throw err;
         newUser.password=hash;
         newUser.save()
         .then(user=>{
             jwt.sign(
                 {id:user.id},
                 config.get('jwtSecret'),
                 {expiresIn:3600},
                 (err,token)=>{
                     if(err) throw err;
                     res.json({
                         token,
                        user:{
                            id:user.id,
                            email:user.email
                        }
                    });

                 }
             )
           
         });
     });
    }
    );
});
});
module.exports = router;