var express=require("express")
var router=express.Router({mergeParams: true})



router.get("/user",function(req,res){
    res.send("User Roues working ")
})




// Export models
module.exports=router