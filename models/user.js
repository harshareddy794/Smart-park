var mongoose=require("mongoose")
userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    address: String,
    phone:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
})
module.exports=mongoose.model("user",userSchema)