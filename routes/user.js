var express=require("express")
var user = require("../models/user")
var booking = require("../models/booking")
var router=express.Router({mergeParams: true})
var passport=require("passport")


// +++++++ User Routes +++++++++++++

router.get("/userdashboard",isLoggedIn,function(req,res){
    user.findById(req.user._id,function(err,foundUser){
        if(err){
            req.flash("error","Something went wrong")
            res.redirect("back")
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
                req.flash("error","Something went wrong")
                res.redirect("back")
            }else{
                req.flash("success","Successfully signed up. Login here now")
                res.redirect("/login")
            }
        })
    }else{
        req.flash("error","Passwords did not match")
        res.redirect("back")
    }
})


router.get("/login",function(req,res){
    res.render("user/login")
})


router.post("/login",passport.authenticate("local",{
    successRedirect: "/dashboard",
    successFlash:"Logged in successfully",
    failureRedirect: "/login",
    failureFlash:true
}),function(req,res){
})

router.get("/editprofile",isLoggedIn,function(req,res){
    res.render("user/editprofile")
})

router.post("/editprofile",isLoggedIn,function(req,res){
    newUser={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    }
    user.findByIdAndUpdate(req.user._id,newUser,function(err,foundUser){
        if(err){
            req.flash("error","Something went wrong")
            res.redirect("back")
        }else{
            req.flash("success","Profile is updated successfully")
            res.redirect("/userdashboard")
        }
    })
})


router.get("/logout",function(req,res){
    req.logOut()
    req.flash("success","Logged you out succesfully!")
    res.redirect("/dashboard")
})


// Export models
module.exports=router

// +++++++++++ Middle ware ++++++++++++++++
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error","You must be logged in first")
        res.redirect("/login")
    }
}
