var express=require("express")
var router=express.Router({mergeParams: true})
var booking = require("../models/booking")
var slot=require("../models/slot")

router.get("/slotsdashboard",function(req,res){
    slot.find({},function(err,foundslots){
        if(err){
            console.log(err)
        }else{
            res.render("slots/slotsdashboard",{slots:foundslots})
        }
    })
})

router.get("/bookslot/:id",isLoggedIn,function(req,res){
    slot.findById(req.params.id,function(err,foundSlot){
        if(err){
            console.log(err)
        }else{
            res.render("slots/booking",{slot:foundSlot})
        }
    })
})

router.post("/bookslot/:id",isLoggedIn,function(req,res){
    slot.findById(req.params.id,function(err,foundSlot){
        if(err){
            console.log(err)
        }else{
            if(foundSlot.slotCapacity==req.body.capacity){
                var newUser={
                    id:req.user._id,
                    username:req.user.username
                }
                var newSlot={
                    id:foundSlot._id,
                    slotnumber:foundSlot.slotnumber
                }
                book={
                    checkout:req.body.date+' '+req.body.time,
                    user:newUser,
                    slot:newSlot
                }
                console.log(book)
                booking.create(book,function(err,newBooking){
                    if(err){
                        console.log(err)
                    }else{
                        update={
                            avaliablity:false
                        }
                        slot.findByIdAndUpdate(req.params.id,update,function(err,foundSlot){
                            if(err){
                                console.log(err)
                            }else{
                                res.redirect("/dashboard")
                            }
                        })
                    }
                })
            }else{
                res.send("This slot is not compitable")
            }
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
