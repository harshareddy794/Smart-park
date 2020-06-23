var mongoose=require("mongoose")
var passportLocalMongoose=require("passport-local-mongoose")
userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:String,
        required: true,
    },
    password:{
        type:String,
    },
})

userSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model("user",userSchema)