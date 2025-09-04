const mongoose=require('mongoose');
const initData=require('./data');
const Listing = require('../models/listing');

const MONGO_URL='mongodb://127.0.0.1:27017/Airbnb';
main().then(()=>{
    console.log("database is connected");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB= async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj) => ({...obj,owner:'68afe073864d39d469b2a4d8'}));
    await Listing.insertMany(initData.data);
    console.log("data was inserted");
}

initDB();