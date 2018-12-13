const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const should = chai.should()

const Post = require("../models/post")

const post = {
  title: "post",
  url: "https://www.google.com",
  summary: "flare summary",
}


describe("Posts", () => {
  it("should create with valid attributes at POST /posts", done => {
    Post.findOneAndRemove(post, function() {
      Post.find(function(err, posts) {
        const postCount = posts.count
        const post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        chai
          .request("localhost:3000")
          .post("/posts")
          .send(post)
          .then(res => {
            Post.find(function(err, posts) {
              postCount.should.be.equal(posts.length - 1)
              res.should.have.status(200)
              return done()
            })
          })
          .catch(err => {
            return done(err);
          })
      })
    })

  })

})
