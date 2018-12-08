// Conntectiong Data (MongoDB)
require('./data/reddit-db');
require('dotenv').config();

// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const app = express()

// Custom middleware: Checking Login Status
const checkAuth = (req, res, next) => {
  console.log("Checking authencation");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null
  } else {
    const token = req.cookies.nToken
    const decodedToken = jwt.decode(token, { complete: true}) || {};
    req.user = decodedToken.payload;
    console.log("else")
  }
  next();
}

// Integrating middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

// Connecting controllers
const posts = require("./controllers/posts.js")(app);
const subreddits = require("./controllers/subreddits.js")(app);
const comments = require("./controllers/comments.js")(app);
const auth = require("./controllers/auth.js")(app)


// // Mock Post Model
// let posts = [
//   { title: "Alpha", url: "www.aaa.com", summary: "A Summary" },
//   { title: "Beta", url: "www.bbb.com", summary: "Be Cool" }
// ]

// // HTTP Action: Index
// app.get("/", (req, res) => {
//   res.render("posts-index", { posts: posts })
// })



app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
