import express from "express";
import cors from "cors";
const PORT = 8081;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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
