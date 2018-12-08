const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment")

module.exports = (app) => {

  // HTTP Protocol: New User
  app.get("/sign-up", (req, res) => {
    res.render("users-new")
  })


  // HTTP Protocol: Create User
  app.post("/sign-up", (req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then(user => {
        console.log(user)
        var token = jwt.sign({ _id: user._id}, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
        console.log(req.cookies)
        res.redirect("/")
      })
      .catch(err => {
        console.log(err.message)
        return res.status(400).send({ err: err })
      })
  })

  // HTTP Protocol: Get (Logout)
  app.get("/logout", (req, res) => {
    res.clearCookie("nToken");
    res.redirect("/")
  })

  // HTTP Protocol: Get (Login)
  app.get("/login", (req, res) => {
    res.render("users-login")
  })

  // HTTP Protocol: Post (Login)
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Search for username
    User.findOne({ username }, "username password")
      .then(user => {
        if (!user) {
          // User not found
          return res.status(401).send({ message: "Wrong Username or Password"})
        }
        // Username found, checking password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            return res.status(401).send({ messsage: "Wrong Password"})
          }
          // Username and password match, create token
          const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
            expiresIn: "60 days"
          })
          // Set a cookie and redirect to root
          res.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
          res.redirect("/")
        })
      })
      .catch(err => {
        console.log(err);
      })
  })


}
