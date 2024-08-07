const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.put("/table_tmdb/favorites/:id", (req, res) => {
  const { id } = req.params;
  let { favorites } = req.body;

  console.log("Requête PUT reçue pour ID:", id);
  console.log("Nouveaux favoris reçus:", favorites);

  const favoritesString = JSON.stringify(favorites);

  // Mettre à jour les favoris
  const sqlUpdate = "UPDATE table_tmdb SET favorites = ? WHERE id = ?";
  // récupérer favorites string et les envoyé dans favoris
  db.query(sqlUpdate, [favoritesString, id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour des favoris :", err);
      return res.status(500).json(err);
    }
    console.log("Favoris mis à jour dans la base de données:", favoritesString);
    return res.status(200).json({
      message: "Favoris mis à jour avec succès",
    });
  });
});

module.exports = router;
