const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const Review=require('./reviews.js');
let listingSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        image:{
            url:String,
            filename:String
        },
        price:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        reviews:[
            {
                type:Schema.Types.ObjectId,
                ref:'Review'
            }
        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    }
);

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing)
    await Review.deleteMany({reviews:{$in: listing.reviews}});
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;