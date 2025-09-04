const Listing=require('../models/listing')

module.exports.searchQuery=async(req,res,next)=>{
    let q=req.query.q;
    let result=await Listing.find({location:{ $regex: q, $options: "i" }});
    
    res.render("searchResults.ejs",{ result, query: q });
}
module.exports.index=async (req,res) =>{
    let listing= await Listing.find();
    // console.log(listing[0].title);
    res.render("index.ejs",{listing});
};

module.exports.renderNewForm=(req,res) =>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in");
        return res.redirect('/login');
    }
    res.render("new.ejs");
};

module.exports.showListing=async (req,res) =>{
    try{
        let id=req.params.id;
    // console.log(id);
    let listing = await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    }).populate('owner');
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect('/listing');
    }else{
        res.render("show.ejs",{listing});
    }
    
    }catch(err){
        next(err);
    }
};

module.exports.createListing=async (req,res,next) =>{
    try{
        // using a joi
        // let result=listingSchema.validate(req.body);
        // // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error);
        // }  make a function 
        let url=req.file.path;
        let filename=req.file.filename;
        
        let newListing=req.body;
        // if(!newListing){
        //     throw new ExpressError(404,"Please send valid data");
        // }
        // if(!newListing.description){
        //     throw new ExpressError(404,"Description is missing");
        // }
        // if(!newListing.price){
        //     throw new ExpressError(404,"Price is missing");
        // }
        // if(!newListing.location){
        //     throw new ExpressError(404,"Location is missing");
        // }
        newListing.owner=req.user._id;
        newListing.image={url,filename};
    await Listing.insertMany(newListing);
    req.flash("success","New listing created");
    res.redirect("/listing");
    }catch(err){
        next(err);
    }
    
};

module.exports.renderEditForm=async (req,res) =>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing does not exist");
        res.redirect('/listing');
    }else{
        res.render("edit.ejs",{listing});
    }
    
};

module.exports.updateListing=async (req,res) =>{
    let id=req.params.id;
    // console.log(req.body);
    let updateListing=req.body;
    // console.log(updateListing);
    let lisitng=await Listing.findById(id);
    
    let listing=await Listing.findByIdAndUpdate(id,updateListing);
    if(typeof(req.file) !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Edited succesfully");
    res.redirect('/listing');
    
};

module.exports.destroyRoute=async (req,res) =>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listing");
};
