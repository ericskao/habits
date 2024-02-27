var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function (req, res, next) {
  res.send([
    { id: 1, name: "Study" },
    { id: 2, name: "Meditate" },
  ]);
});

router.post("/", function (req, res, next) {
  const { name, goalQuantity } = req.body;
  console.log("NAME", name, "QUANTITY", goalQuantity);
  pool.query(
    "INSERT INTO habits (name, goal_quantity) VALUES ($1, $2) RETURNING *",
    [name, goalQuantity],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(results.rows[0]);
    },
  );
});

module.exports = router;
