const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../models/user");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);



describe("User", function() {
  it("should not be able to login if they have not registered", done => {
    agent.post("/login", { email: "wrong@wrong.com", password: "nope" })
      .end(function(err, res) {
        res.status.should.be.equal(401);
        done();
    });
  });
  it("should be able to signup", done => {
    User.findOneAndRemove({ username: "testone"}, function() {
      agent
        .post("/sign-up")
        .send({ username: "testone", password: "password"})
        .end(function(err, res) {
          console.log(res.body);
          res.should.have.status(200)
          agent.should.have.cookie("nToken")
          done()
        })
    })
    it("should be able to login", done => {
      agent
        .post("/login")
        .send({ email: "username", password: "password" })
        .end(function(err, res) {
          res.should.have.status(200);
          agent.should.have.cookie("nToken")
          done();
        })
    })
  })
});
