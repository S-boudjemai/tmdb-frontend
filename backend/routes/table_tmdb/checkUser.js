const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});

router.get("/checkUser/:id", (req, res) => {
  console.log("requête reçu checkuser");

  const { id } = req.params;
  // check user est appelé au login avec un id, et ici on extraie cet id
  console.log("id : ", id);

  const sql = "SELECT * FROM table_tmdb WHERE id = ? ";
  // chercher l'id ddans la database
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("erreur de verif du user checkuser", err);
      // catch error
      return res.status(500).json(err);
    }
    if (result.length > 0) {
      console.log("Utilisateur trouvé");
      return res.status(200).json({ exists: true });
    } else {
      console.log("Utilisateur non trouvé");
      return res.status(200).json({ exists: false });
    }
  });
});

module.exports = router;
