const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const PORT = 8081;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6Z:3r%3FUht=",
  database: "user_schema",
});
// ici je crée la connexion avec la database

db.connect((err) => {
  if (err) {
    console.error("erreur de connexion à la db", err);
    return;
  }
  console.log("connecté à la db mysql");
});
// ici établit la connexion et vérifie les erreurs

app.get("/", (req, res) => {
  return res.json("from backend side");
});
// route de test pour vérifier que le serveur fonctionne

//  IMPORTATION DES ROUTES TABLE TMDB //

const addUser = require("./routes/table_tmdb/addUser");
const updateFavorites = require("./routes/table_tmdb/updateFavorites");
const checkUser = require("./routes/table_tmdb/checkUser");
const getFavorites = require("./routes/table_tmdb/getFavorites");

app.use("/", getFavorites);
app.use("/table_tmdb", addUser);
app.use("/", updateFavorites);
app.use("/table_tmdb", checkUser);

app.listen(PORT, () => {
  console.log("listening");
});
// démarre le serveur
