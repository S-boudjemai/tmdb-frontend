import express from "express";
import mysql from "mysql";
import cors from "cors";
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

db.connect((err: any) => {
  if (err) {
    console.error("erreur de connexion à la db", err);
    return;
  }
  console.log("connecté à la db mysql");
});
// ici établit la connexion et vérifie les erreurs

app.get("/", (req: any, res: { json: (arg0: string) => any }) => {
  return res.json("from backend side");
});
// route de test pour vérifier que le serveur fonctionne

//  IMPORTATION DES ROUTES TABLE TMDB //

import addUser from "./routes/addUser";
import updateFavorites from "./routes/updateFavorites";
import checkUser from "./routes/checkUser";
import getFavorites from "./routes/getFavorites";

app.use("/", addUser);
app.use("/", updateFavorites);
app.use("/", checkUser);
app.use("/", getFavorites);

app.get("/test", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Route de test atteinte");
});

app.listen(PORT, () => {
  console.log("listening");
});
// démarre le serveur
