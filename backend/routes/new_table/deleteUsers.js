const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.delete("/:id_user", (req, res) => {
  const { id_user } = req.params;
  const sql = "DELETE FROM new_table WHERE id_user = ?";
  //   where est la condition on met à jour à la ligne ou l'id fourni correspond à id_user
  db.query(sql, [id_user], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès" });
  });
});

module.exports = router;
