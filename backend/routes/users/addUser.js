const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "tmdb_db",
});

// post l'id
router.post("/addUser", (req, res) => {
  console.log("requête reçu add user");
  // extraction de l'id posté via register
  const { id_firebase } = req.body;
  console.log("données reçues :", id_firebase);

  const checkUserSql = "SELECT * FROM users WHERE id_firebase = ?";
  // requête sql qui cherche id
  db.query(checkUserSql, [id_firebase], (err, result) => {
    // prends en paramètre l'id défini plus haut
    if (err) {
      console.error("erreur de la vérif", err);
      return res.status(500).json(err);
      // s'il ne trouve pas l'id
    }
    if (result.length > 0) {
      // utilisateur existe déjà
      console.log("user existe");
      return res.status(200).json({ message: "Utilisateur déjà existant " });
    } else {
      // ajouter nouvel utilisateur
      const insertUserSql = "INSERT INTO users (id_firebase) VALUES(?)";

      db.query(insertUserSql, [id_firebase], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        console.log("user ajouté ");

        return res.status(201).json({
          message: "Utilisateur ajouté avec succès",
          id: id_firebase,
        });
      });
    }
  });
});

module.exports = router;
