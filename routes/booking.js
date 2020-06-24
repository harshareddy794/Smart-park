var express=require("express")
var router=express.Router({mergeParams: true})
var booking = require("../models/booking")
var slot=require("../models/slot")

router.get("/slotsdashboard",isLoggedIn,function(req,res){
    slot.find({},function(err,foundslots){
        if(err){
            console.log(err)
        }else{
            res.render("slots/slotsdashboard",{slots:foundslots})
        }
    })
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
