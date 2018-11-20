// Conntectiong Data (MongoDB)
require('./data/reddit-db');

// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const app = express()
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

// Integrating middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Connecting controllers
const posts = require("./controllers/posts.js")(app);


// // Mock Post Model
// let posts = [
//   { title: "Alpha", url: "www.aaa.com", summary: "A Summary" },
//   { title: "Beta", url: "www.bbb.com", summary: "Be Cool" }
// ]

// HTTP Action: Index
app.get("/", (req, res) => {
  res.render("posts-index", { posts: posts })
})



app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
