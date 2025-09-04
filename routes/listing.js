const express=require('express');
const router=express.Router({mergeParams:true});
const Listing=require('../models/listing.js');
const {listingSchema}=require("../schema.js");
const ExpressError=require('../utils/ExpressError');
const {isLoggedIn}=require('../middleware.js');


const multer=require('multer');
const {storage}=require('../cloudConfig.js');
const  upload=multer({storage});


const listingController=require('../controller/listing.js')

const validateListing=(req,res,next)=>{
    // console.log(req.body);
    let {error}=listingSchema.validate(req.body);
    
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

router
    .route("/")
    .get(listingController.index)
    .post(isLoggedIn,upload.single("image"),validateListing,listingController.createListing);

router.get('/new',isLoggedIn,listingController.renderNewForm);

router.get("/search",listingController.searchQuery);

router.route('/:id')
    .get(listingController.showListing)
    .put(isLoggedIn,upload.single("image"),validateListing,listingController.updateListing)
    .delete(isLoggedIn,listingController.destroyRoute)


// router.get('/',listingController.index)



// router.get('/:id',listingController.showListing);

// router.post('/',isLoggedIn,validateListing,listingController.createListing)

router.get('/:id/edit',isLoggedIn,listingController.renderEditForm);
// router.put('/:id',isLoggedIn,validateListing,listingController.updateListing)
// router.delete('/:id',isLoggedIn,listingController.destroyRoute)

module.exports=router;