const humps = require("humps");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "habits_api",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    },
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    },
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

// const getGoals = (request, response) => {
//   pool.query(
//     "SELECT * FROM goals WHERE DATE(goals.created_at) = CURRENT_DATE ORDER BY is_primary DESC",
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(humps.camelizeKeys(results.rows));
//     },
//   );
// };

// const createGoal = (request, response) => {
//   const { title, isPrimary } = request.body;
//   pool.query(
//     "INSERT INTO goals (title, is_primary) VALUES ($1, $2) RETURNING *",
//     [title, isPrimary],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(humps.camelizeKeys(results.rows[0]));
//     },
//   );
// };

// const updateGoal = (request, response) => {
//   const { id } = request.params;
//   const { completed, title } = request.body;
//   if (request.body.hasOwnProperty("completed")) {
//     // check/uncheck goal
//     pool.query(
//       `UPDATE goals SET completed = ${completed} WHERE goals.id = ${id}`,
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         response.status(200).send();
//       },
//     );
//   } else {
//     // updating goal name
//     const query = `UPDATE goals SET title = '${title}' WHERE goals.id = ${id}`;
//     pool.query(query, (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send();
//     });
//   }
// };

// const deleteGoal = (request, response) => {
//   const { id } = request.params;
//   const query = `DELETE FROM goals WHERE goals.id = ${id}`;
//   pool.query(query, (error) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send();
//   });
// };

// module.exports = {
//   getGoals,
//   createGoal,
//   updateGoal,
//   deleteGoal,
// };
