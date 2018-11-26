var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Place      = require("./models/place"),
    seedDB     = require("./seeds");


mongoose.connect("mongodb://localhost/visitNL", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// Place.create({    
//     name: "Signal Hill", 
//     image: "https://www.crhp-rclp.ca/UploadedImages/72627.jpg",
//     description: "Signal Hill is a hill which overlooks the city of St. John's, Newfoundland and Labrador, Canada. Due to its strategic placement overlooking the harbour, fortifications were built on the hill beginning in the mid 17th century. "
// }, function(err, place){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Newly created place:");
//         console.log(place);
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});

//Get all places from db
app.get("/places", function(req, res){
    Place.find({}, function(err, allPlaces){
        if(err){
            console.log(err);
        } else {
            res.render("places/index", {places: allPlaces});
        }
    });
});

//get data from form and add to places array
//redirect back to places page
//Create a new place and add to DB
app.post("/places", function(req,res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newPlace = {name: name, image: image, description: desc};
    Place.create(newPlace, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            //redirect to places page
            res.redirect("/places");
        } 
    });
});

app.get("/places/new", function(req,res){
    res.render("places/new");
});


// find the campground with the provided ID
// render show template with that campground
app.get("/places/:id", function(req,res){
    Place.findById(req.params.id).populate("comments").exec(function(err, foundPlace){
        if(err) {
            console.log(err);
        } else {
            console.log(foundPlace);
            res.render("places/show", {place : foundPlace});
        }
    });
});

// ===========================
// COMMENTS ROUTES
// ===========================

app.get("/places/:id/comments/new", function(req,res) {
    Place.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }

    });
    res.render("comments/new");
});
app.listen(4000, function(){
    console.log("Server started on port 4000 ");
});