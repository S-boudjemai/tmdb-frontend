const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "tmdb_db",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1);
  }
  console.log("Connecté à la base de données");
});

router.get("/users/favorites/:id_firebase", (req, res) => {
  const { id_firebase } = req.params;
  // récupérer les favoris selon l'id

  const sql = "SELECT favorites FROM users WHERE id_firebase = ?";
  db.query(sql, [id_firebase], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des favoris :", err);
      return res.status(500).json(err);
      // error récupération des favoris
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Favoris non trouvé" });
      // S'il n'y a pas de résultats
    }
    res.status(200).json({
      favorites: result[0].favorites,
      // Les résultats des favoris
    });
  });
});

module.exports = router;
