var express=require("express")
const user = require("../models/user")
var router=express.Router({mergeParams: true})
var passport=require("passport")


// +++++++ User Routes +++++++++++++

router.get("/userdashboard",isLoggedIn,function(req,res){
    user.findById(req.user._id,function(err,foundUser){
        if(err){
            console.log(err)
        }else{
            res.render("user/userdashboard",{user:foundUser})
        }
    })
})

router.get("/signup",function(req,res){
    res.render("user/signup")
})

router.post("/signup",function(req,res){
    if(req.body.password==req.body.confirmpassword){
        newUser={
            username:req.body.username,
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
        }
        user.register(newUser,req.body.password,function(err,foundUser){
            if(err){
                console.log(err)
            }else{
                res.send("Successfully signed up plases login")
            }
        })
    }else{
        res.send("Pass did not match")
    }
})


router.get("/login",function(req,res){
    res.render("user/login")
})

router.post("/login",passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/login",
}),function(req,res){
    
})


router.get("/logout",function(req,res){
    req.logOut()
    // req.flash("success","Logged you out succesfully!")
    res.redirect("/")
})








// Export models
module.exports=router

// +++++++++++ Middle ware ++++++++++++++++
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        // req.flash("error","You must be logged in first")
        res.redirect("/login")
    }
}
