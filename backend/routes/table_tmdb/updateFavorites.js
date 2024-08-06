const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  let { favorites } = req.body;

  if (!Array.isArray(favorites)) {
    return res.status(400).json({
      message: "Les favoris sont passé sous form de tableau d'id de films ",
    });
  }

  favorites = JSON.stringify(favorites);

  const sql = "UPDATE table_tmdb SET favorites = ? WHERE id = ?";
  db.query(sql, [favorites, id], (err, result) => {
    if (err) {
      console.error("erreur lors de la mise à jours des favoris : ", err);
      return res.status(500).json(err);
    }
    return res.status(200).json({
      message: "Favoris mis à jour avec succès",
    });
  });
});

module.exports = router;

// envoyer les movies id to string puis l'inverse pour les récupérer
