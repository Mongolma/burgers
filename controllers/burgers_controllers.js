//Dependencies
var express = require("express");
var app = express();
var path = require("path");
var burger = require("../models/burger.js");
app.use(express.static(path.join(__dirname, "public")));
// Create an instance of for the express.Router app
var router = express.Router();

// Create all the routes and set up logic within those routes where required
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = { burgers: data };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger, false],
    function (result) {
      //Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log("line 37", res);
  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (!result.changedRows === 0) {
        //If no rows were changed, then the ID must not exist, so 404
        console.log("put method's cb para 48", result);
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//Export routes for burger.js to use
module.exports = router;
