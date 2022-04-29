var express = require('express');
var app = express();
var bodyParser = require("body-parser");

console.log("Hello World");

/* app.get("/", function(req, res) {res.send("Hello Express");}); */

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

absolutePath = __dirname + '/views/index.html';

absolutePath1 = __dirname + '/public';

 app.get("/", function(req, res) {
  res.sendFile(absolutePath);
}); 

app.use("/public", express.static(absolutePath1));

app.use(function middleware(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({
    time: req.time
  });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

app.get('/name', function(req, res){
  let firstName = req.query.first;
  let lastName = req.query.last;
  let jsonObj = {name: firstName + " " + lastName};
  res.json(jsonObj);
});

app.post("/name", function(req, res){
  let first_name = req.body.first;
  let last_name = req.body.last;
  let string = ({name: first_name + " " + last_name});
  res.json(string);
});

const mySecret = process.env['MESSAGE_STYLE'];

app.get("/json", (req, res) => {

  const mySecret = process.env['MESSAGE_STYLE'];

  let response = "Hello json";
  
  if (mySecret === "uppercase") {
    response = response.toUpperCase();
  } else {
    response;
  }
  res.json({ "message": response})
});



console.log(mySecret);

 module.exports = app;
