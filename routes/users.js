const express =require("express");
const router = express.Router();
const User =require("../models/User");
const bcrypt=require('bcryptjs');
const config =require('config');
const jwt =require('jsonwebtoken');
const validator = require("email-validator");
const auth = require("../middelware/auth");


router.post('/',(req,res)=>{
const{email,password}=req.body;
if(!email||!password)
{return res.status(400).json({msg:'Please enter all filels'});}
if(validator.validate(email)===false)
{return res.status(400).json({msg:'not a valide email'});}
if(password.length<=8)
{return res.status(400).json({msg:'password must be greater than 8 characters'});}


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



router.delete('/delete/:email',(req,res)=>
{
const {email}=req.params;

User.findOneAndDelete({email})
.then((user)=>{
      if (!user) return res.status(400).json({msg:'user does not exist'})
      res.status(200).json({success:"Account deleted"}) })

.catch((err) => console.log("Error", err));
}
)
module.exports = router;