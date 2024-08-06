const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.post("/", (req, res) => {
  // déclare la route pour les requêtes post
  const { id_user, email_user, password_user, favorites_user } = req.body;
  // données envoyées dans le corps de la requête, on décompose l'objet req.body pour récupérer les props

  const sql =
    "INSERT INTO new_table (id_user, email_user, password_user, favorites_user) VALUES (?, ?, ?, ?)";
  // la requête sql pareil que j'aurai tapé dans la console workbench
  // les ? permettent de sécuriser les requêtes et protéger contres les injections SQL
  db.query(
    // éxecute la requête avec les valeurs fournies
    sql,
    // la requête sql définie précedemment
    [id_user, email_user, password_user, favorites_user],
    // tableau des valeurs à insérer à la place des ??
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json({
        message: "Utilisateurs ajouté avec succès",
        id: result.insertId,
        // message de réussite + id de l'utilisateur inséré
      });
    }
  );
});

module.exports = router;
