const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const reviewSchema=new Schema({
    rating:{
        type:Number
    },
    comment:String,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;
