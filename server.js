// Requiring middleware
const express = require("express")
const exphbs = require("express-handlebars")
const app = express()

// Integrating middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.get("/", function (req, res) {
  res.render("home")
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Listening at port 3000!")
})
