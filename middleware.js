const Review=require('./models/reviews')

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        console.log(req.originalUrl);
        req.flash("error","You must be logged in");
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=(req,res,next)=>{
    
}
module.exports.isReviewAuthor=async (req,res,next) =>{
    let {reviewId,id} =req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have access");
        return res.redirect(`/listing/${id}`);
    }
    next();
}