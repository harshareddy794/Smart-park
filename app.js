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
var slot=require("./models/slot")
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

app.get("/dashboard",function(req,res){
    res.render('dashboard')
})


// +++++++++++++ user routes +++++++++++++++

var userRoutes=require("./routes/user")
app.use(userRoutes)
var bookingRoutes=require("./routes/booking")
app.use(bookingRoutes)


// +++++++++++ App listening ++++++++++++++++++++
app.listen(3000,"127.0.0.1",function(){
    console.log("app is listening")
})


// +++++++++++ Middle ware ++++++++++++++++
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        // req.flash("error","You must be logged in first")
        res.redirect("/login")
    }
}


// ++++++++++++++++ Creation of slots ++++++++++++++++++++
// var i=0
// for(i=0;i<10;i++){
//     newslot={
//         slotnumber:i+1
//     }
//     slot.create(newslot,function(err,slot){
//         if(err){
//             console.log(err)
//         }else{
//             console.log(slot)
//         }
//     })
// }
// console.log("Done creation of slots")