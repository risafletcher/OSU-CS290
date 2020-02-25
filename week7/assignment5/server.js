let express = require("express");
let bodyParser = require('body-parser');
let app = express();

let handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8000);

//BODY PARSER SET-UP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//POST HANDLER
app.post('/', function (req, res) {
    let reqBodyRows = [];
    let queryRows = [];
    for (let param in req.body) {
      const newRow = {};
      newRow.key = param;
      newRow.value = req.body[param];
      reqBodyRows.push(newRow);
    }
      for (let param in req.query) {
        const newRow = {};
        newRow.key = param;
        newRow.value = req.query[param];
        queryRows.push(newRow);
      }
    res.render('postRequest', { reqBodyRows, queryRows });
});

app.get('/', function (req, res) {
    let rows = [];
    for (let param in req.query) {
      const newRow = {};
      newRow.key = param;
      newRow.value = req.query[param];
      rows.push(newRow);
    }
    res.render('getRequest', { rows });
});

app.use(function(req, res) {
  res.status(404);
  res.render("404 - Not Found");
});

app.use(function(req, res, next) {
  console.log(err.stack);
  res.type("text/plain");
  res.status(500);
  res.render("500 - Server Error");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express server started on" +
      app.get("port") +
      "; press Ctrl-C to terminate"
  );
});

