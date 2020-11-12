const express=require('express');
const passport=require('passport');
const router = express.Router();
const userModel=require("../Model/userModel")
const checkAuth=require("../Utils/checkAuth")
router.get("/",checkAuth.checkNotAuthenticate,function(req,res){
    res.render("Home");
})

router.post("/login",checkAuth.checkNotAuthenticate,passport.authenticate('local',{
    successRedirect: '/reservation/data',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get("/login",checkAuth.checkNotAuthenticate,function(req,res){
    res.render("login");
})

router.get("/register",checkAuth.checkNotAuthenticate,function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var userObj=new userModel({...req.body});
    userObj.save(function(err,result){
        if(err)
        {
            console.log(err)
        }
        else{
            res.redirect("/login")
        }
    });
    
})

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})

module.exports= router;