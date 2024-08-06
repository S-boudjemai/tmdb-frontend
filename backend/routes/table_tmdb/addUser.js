const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

// post l'id
router.post("/addUser", (req, res) => {
  console.log("requête reçu add user");

  const { id } = req.body;
  console.log("données reçues :", id);

  const checkUserSql = "SELECT * FROM table_tmdb WHERE id = ?";
  db.query(checkUserSql, [id], (err, result) => {
    if (err) {
      console.error("erreur de la vérif", err);
      return res.status(500).json(err);
    }
    if (result.length > 0) {
      // utilisateur existe déjà
      console.log("user existe");
      return res.status(200).json({ message: "Utilisateur déjà existant " });
    } else {
      // ajouter nouvel utilisateur
      const insertUserSql = "INSERT INTO table_tmdb (id) VALUES(?)";
      db.query(insertUserSql, [id], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        console.log("user ajouté ");

        return res.status(201).json({
          message: "Utilisateur ajouté avec succès",
          id: id,
        });
      });
    }
  });
});

module.exports = router;
