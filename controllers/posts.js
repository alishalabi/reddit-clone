module.exports = app => {

  // HTTP Protocol: Create
  app.post("/posts/new", (req, res) => {
    console.log(req.body)
  })

}
