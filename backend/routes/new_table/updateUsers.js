const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const { route } = require("./getUsers");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.put("/:id_user", (req, res) => {
  // paramtre id user dans l'url pour pointer celui qu'on veut
  const { id_user } = req.params;
  //   extrait l'id de l'url
  const { email_user, password_user, favorites_user } = req.body;
  //   contient les données, déstructure pour récupérer les props
  const sql =
    "UPDATE new_table SET email_user = ?, password_user = ?, favorites_user = ? WHERE id_user = ?";
  db.query(
    sql,
    [email_user, password_user, favorites_user, id_user],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res
        .status(200)
        .json({ message: "Utilisateur mis à jour avec succès" });
    }
  );
});

module.exports = router;
