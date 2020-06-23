// ++++++++++++ Required packages +++++++++++++++++++
var express=require("express")
var app=express();
app.use(express.static("public"))
app.set("view engine","ejs")
var  bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))
var methodOverride= require("method-override")
app.use(methodOverride("method"))
require('dotenv').config();

// +++++++++++++++ Mongoose setup +++++++++++++++++++
var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/smart-parking",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},function(err){
    if(err){
        console.log("Cannot connect to database")
    }
})


// ++++++++++++++++++ Models +++++++++++++++++++
var slot=require("./models/slots")
var user=require("./models/user")

//++++++++++++ Passport initilize ++++++++++++++++++++
var passport=require("passport")
var localStratagy=require("passport-local")
var expressSessions=require("express-session")

app.use(expressSessions({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized :false
}))
app.use(passport.initialize())
app.use(passport.session())


//++++++++++++ Passport use ++++++++++++++++++++
passport.use(new localStratagy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next();
});

// +++++++++++++ Routes +++++++++++++++++++++

app.get("/",function(req,res){
    res.render("landing")
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

app.get("/dashboard",function(req,res){
    console.log(currentUser.username)
})
// +++++++++++++ user routes +++++++++++++++

var userRoutes=require("./routes/user")
app.use(userRoutes)

// +++++++++++ App listening ++++++++++++++++++++


app.listen(3000,"127.0.0.1",function(){
    console.log("app is listening")
})

