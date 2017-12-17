var router = require("express").Router();
var ObjectID= require("mongodb").ObjectID;

module.exports = function(dbclient) {

  router.get("/", function(req, res) {
    dbclient.then(function(db) {
      db.collection("newsletter").find().toArray(function(err, data) {
        if(err) res.redirect("/error");
        res.render("newsletter", {data});
      });
    });
  });

  router.get("/del/:userId", function(req, res) {
    dbclient.then(function(db) {
      db.collection("newsletter").remove({_id: ObjectID(req.params.userId)}, function(err) {
        if(err) res.redirect("/error");
        res.redirect("/newsletter");
      });
    });
  });

  router.post("/create", function(req, res) {
    dbclient.then(function(db) {
      db.collection("newsletter").insertOne({email: req.body.email}, function(err) {
        if(err) res.redirect("/error");
        res.redirect("/newsletter");
      });
    });
  });

  return router;
};
