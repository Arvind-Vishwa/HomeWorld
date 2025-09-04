const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride = require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');
const session=require('express-session');
const mongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const localStrategy=require('passport-local');
const User=require('./models/user.js');

if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const dbUrl=process.env.ATLASDB_URL;




const listingsRouter=require('./routes/listing.js')
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');
const MongoStore = require('connect-mongo');

const MONGO_URL='mongodb://127.0.0.1:27017/Airbnb';
main().then(()=>{
    console.log("database is connected");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json()); 



// app.get('/',(req,res) =>{
//     res.send("root");
// });

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24* 3600,
});

store.on("error",()=>{
    console.log("ERROR in MANGO SESSION STORE",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    cookies:{
        expires:Date.now()+7 *24 *60 * 60 *1000,
        maxAge:7 *24 *60 * 60 *1000,
        httpOnly:true,
    }
}



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating middleware
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash('success');
    res.locals.errorMsg=req.flash('error');
    res.locals.currUser=req.user;
    next();
});

// app.get('/demoUser',async (req,res) =>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta"
//     });

//     let registerUser=await User.register(fakeUser,"hellocoder");
//     res.send(registerUser);

// })

app.use('/listing',listingsRouter);
app.use('/listing/:id/reviews',reviewRouter);
app.use('/',userRouter);

app.use((req,res,next)=>{
        next(new ExpressError(404,"page not found"));
    })
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8000,()=>{
    console.log("server is listening");
});