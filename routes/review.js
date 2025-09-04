const express=require('express');
const router=express.Router({mergeParams:true});
const Review=require('../models/reviews.js');
const Listing=require('../models/listing');
const {reviewSchema}=require('../schema.js');
const ExpressError=require('../utils/ExpressError');
const {isLoggedIn,isReviewAuthor}=require('../middleware.js');

const reviewController=require('../controller/reviews.js')
const validateReview=(req,res,next)=>{
    // console.log(req.body);
    let {error}=reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

router.post('/',isLoggedIn,validateReview,reviewController.createReview)

// delete review
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,reviewController.destroyReview);
module.exports=router;