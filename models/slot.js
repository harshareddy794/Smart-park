var mongoose=require("mongoose")
slotsSchema=new mongoose.Schema({
    slotnumber:Number,
    slotCapacity: {type:Number,max:3,min:1,default:1},
    avaliablity: {type:Boolean,default:true}
})

module.exports=mongoose.model("slot",slotsSchema)