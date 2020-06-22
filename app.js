var express=require("express")
var app=express();
app.use(express.static("public"))
app.set("view engine","ejs")

var  bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))
var methodOverride= require("method-override")
app.use(methodOverride("method"))
// ++++++++++++ Required packages +++++++++++++++++++

var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/smart-parking",{useNewUrlParser:true,useUnifiedTopology:true},function(err){
    if(err){
        console.log("Cannot connect to database")
    }
})


// ++++++++++++++++++ Models +++++++++++++++++++
var slot=require("./models/slots")

app.get("/",function(req,res){
    res.send("Welcome to smart parking");
})
app.get("/slots",function(req,res){
    slot.find({},function(err,slots){
        if(err){
            console.log(err)
        }else{
            res.send(slots)
        }
    })
})
app.get("/addslot",function(req,res){
    newslot={
        slotnumber:1,
        slotCapacity:1,
        avaliablity: false
    }
    slot.create(newslot,function(err){
        if(err){
            res.send(err)
        }
    res.send("Done!")
    })
})

app.get("/user",function(req,res){
    res.render("user/forgot")
})


// +++++++++++ App listening ++++++++++++++++++++


app.listen(3000,"127.0.0.1",function(){
    console.log("app is listening")
})

