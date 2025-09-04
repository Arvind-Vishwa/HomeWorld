const Listing=require('../models/listing');
const Review=require('../models/reviews');

module.exports.createReview=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    // console.log(req.body);
    let newReview=new Review(req.body);
    
    
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    
    
    await newReview.save();
    await listing.save();
    console.log("review saved");
    req.flash("success","New reviwed created Successfully")
    res.redirect(`/listing/${listing._id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;

    let result=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted succesfully!");
    // console.log(result);
    res.redirect(`/listing/${id}`);
};
