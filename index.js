var express = require("express");
var app = express();

// path to views
var path = require("path");
var views = path.join(process.cwd(), "views");

/*
  MIDDLEWARE
*/

var bodyParser = require("body-parser");
// parse the request body for POSTed data / form data
app.use(bodyParser.urlencoded({extended: true}));

/*
  STATIC ASSETS
  javascripts, stylesheets, images
  third party / vendor libraries
*/
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

/*
  DATA
*/

var burgers = [
                "Hamburger",
                "Cheese Burger",
                "Dble Cheese Burger"
               ];

var tacos = [
                "Soft Taco",
                "Crunchy Taco",
                "Super Taco"
               ];

/*
  ROUTES
*/
app.get("/home", function(req, res){
  var home_path = path.join(views, "home.html");
  res.sendFile( home_path );
})

app.post("/burgers", function(req, res){
  var burger = req.body.burger;
  burgers.push( burger.name );
  res.redirect("/burgers");
})

app.get("/burgers", function(req, res){
  res.send( burgers.join("</br>") );
})

app.get("/tacos", function(req, res){
  res.send( tacos.join("</br>") );
})

app.get("/tacos/:id", function(req, res){
  var id = req.params.id;
  var selection = tacos[id] || "Sorry, that's not a taco option";
  res.send( selection );
})

app.get("/burgers/:id", function(req, res){
  var id = req.params.id;
  var selection = burgers[id] || "Sorry, that's not a burger option";
  res.send( selection );
});

app.get("/contact", function(req, res){
  var contact_path = path.join(views, "contact.html");
  res.sendFile( contact_path );
})

app.get("/", function(req, res){
  res.send("HOME!!!!!!!!!!!")
});

app.get("/pick-a-number/:num", function(req, res){
  var number = req.params.num;
  res.send(number);
});

app.get("/multiply", function(req, res){
  var x = req.query.x;
  var y = req.query.y;
  var total = x*y;
  res.send( total.toString() );
})

app.get("/add", function(req, res){
  var a = req.query.a;
  var b = req.query.b;
  var total = a+b;
  res.send( total );
})

app.listen(3000, function(){
  console.log("Server running on localhost:3000/")
})
