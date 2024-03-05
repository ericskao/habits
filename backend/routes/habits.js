var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function (req, res, next) {
  pool.query(
    `
    SELECT
      h.id,
      h.name,
      h.goal_quantity,
      COALESCE(ci.check_in_date, CURRENT_DATE) AS check_in_date,
      COUNT(ci.check_in_date)::INTEGER AS num_check_ins
    FROM
      habits h
    LEFT JOIN (
      SELECT
        habit_id,
        check_in_date
      FROM
          check_ins
      WHERE
          check_in_date = CURRENT_DATE
    ) ci
    ON
      h.id = ci.habit_id
    GROUP BY
      h.id, h.name, h.goal_quantity, ci.check_in_date
    `,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send(result.rows);
    },
  );
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
  pool.query(
    "INSERT INTO habits (name, goal_quantity, quantity_type, frequency, repeat_days, start_date ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, goalQuantity, quantityType, frequency, repeatFrequency, startDate],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(results.rows[0]);
    },
  );
});

router.post("/:id/check-in", function (req, res, next) {
  const habitId = req.params.id;
  pool.query(
    "INSERT INTO check_ins (habit_id) VALUES ($1) RETURNING *",
    [habitId],
    (error, results) => {
      if (error) {
        throw error;
      }
      const checkInId = results.rows[0].id;
      console.log("cid", checkInId);
      pool.query(
        `INSERT INTO habit_check_ins (habit_id, check_in_id) VALUES ($1, $2) RETURNING *`,
        [habitId, checkInId],
        (error, results) => {
          if (error) {
            throw error;
          }
          const updatedHabit = pool.query(
            `
           SELECT
              h.id,
              h.name,
              h.goal_quantity,
              COALESCE(ci.check_in_date, CURRENT_DATE) AS check_in_date,
              COUNT(ci.check_in_date)::INTEGER AS num_check_ins
            FROM
              habits h
            LEFT JOIN (
              SELECT
                habit_id,
                check_in_date
              FROM
                  check_ins
              WHERE
                  check_in_date = CURRENT_DATE
            ) ci
            ON
              h.id = ci.habit_id
            WHERE
              h.id = $1
            GROUP BY
              h.id, h.name, h.goal_quantity, ci.check_in_date
            `,
            [habitId],
            (error, results) => {
              if (error) {
                throw error;
              }
              console.log("results", results);
              res.status(201).send(results.rows[0]);
            },
          );
        },
      );
    },
  );
});

module.exports = router;
