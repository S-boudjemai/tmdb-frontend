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
  database: "tmdb_db",
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

const addUser = require("./routes/users/addUser");
const updateFavorites = require("./routes/users/updateFavorites");
const checkUser = require("./routes/users/checkUser");
const getFavorites = require("./routes/users/getFavorites");

app.use("/", addUser);
app.use("/", updateFavorites);
app.use("/users", checkUser);
app.use("/", getFavorites);

app.get("/test", (req, res) => {
  res.send("Route de test atteinte");
});

app.listen(PORT, () => {
  console.log("listening");
});
// démarre le serveur
