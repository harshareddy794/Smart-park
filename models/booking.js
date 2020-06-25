var mongoose=require("mongoose")
bookingsSchema=new mongoose.Schema({
    checkin:{type:Date,default:Date.now},
    checkout:Date,
    user:{
        id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "user"
        },
        username: String
    },
    slot:{
        id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "slot"
        },
        slotnumber:Number
    },
    checkedout:{type:Boolean,default:false}
})

module.exports=mongoose.model("bookings",bookingsSchema)