var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var places = [
    {name: "Gros Morne National Park", image: "https://www.savvymom.ca/wp-content/uploads/fly-images/103173/GrosMorne-690x400-c.jpg"},
    {name: "Signal Hill", image: "https://www.crhp-rclp.ca/UploadedImages/72627.jpg"},
    {name: "Cape Spear", image: "https://journals.openedition.org/cm/docannexe/file/2436/cape_spear_main.ashx.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/places", function(req, res){
    res.render("places.ejs", {places: places});
});

//get data from form and add to places array
//redirect back to campgrounds page
app.post("/places", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newPlace = {name: name, image: image};
    places.push(newPlace);
    
    res.redirect("/places");
});

app.get("/places/new", function(req,res){
    res.render("new.ejs");
});

app.listen(4000, function(){
    console.log("Server started on port 4000 ");
});