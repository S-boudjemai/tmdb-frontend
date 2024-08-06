const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.get("/", (req, res) => {
  // déclare une route pour les requêtes get
  const sql = "SELECT * FROM new_table;";
  // séléctionner les enregistrements à la table new_table (c'est le code que j'aurais tapé dans la console du workbench)
  db.query(sql, (err, data) => {
    // exécute la requête et renvoie les résultats
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = router;
