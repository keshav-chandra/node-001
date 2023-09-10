var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "starone"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});
app.get('/', function(req, res){
   res.render('form');
});

app.get('/login', function(req, res){
   res.render('login');
});
app.get('/hotel', function(req, res){
   res.render('index');
});
app.set('view engine', 'ejs');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/register', function(req, res){
  
var sql = "INSERT INTO userdata  VALUES ('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.username+"','"+req.body.password+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
res.end("registered");
  });
});

app.post('/logincheck', function(req, res){
  
var sql = "select * from userdata where username='"+req.body.username+"' and password='"+req.body.password+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
 if(result.length>0)
{
console.log(result);
res.render("profile",{'name':result[0].firstname});
}
else
{console.log(result);
res.render("error");}
  });
});

app.get('/viewdata', function(req, res){
  
var sql = "select * from userdata";
  con.query(sql, function (err, result) {
    if (err) throw err;
 
res.render("viewrecord",{'data':result});


  });
});


app.listen(3000);