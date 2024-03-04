var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function (req, res, next) {
  pool.query("SELECT name, id FROM habits", (error, result) => {
    console.log("result from get", result);
    if (error) {
      throw error;
    }
    res.status(200).send(result.rows);
  });
});

router.post("/", function (req, res, next) {
  const {
    name,
    goalQuantity,
    quantityType,
    frequency,
    repeatFrequency,
    startDate,
  } = req.body;
  console.log("reqbody", req.body);
  pool.query(
    "INSERT INTO habits (name, goal_quantity, quantity_type, frequency, repeat_days, start_date ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, goalQuantity, quantityType, frequency, repeatFrequency, startDate],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log("results", results, res);
      res.status(201).send(results.rows[0]);
    },
  );
});

router.put("/:id/checkIn", function (req, res, next) {
  console.log("reqqq body", req.body);
  // pool.query()
});

module.exports = router;
