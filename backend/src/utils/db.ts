import mysql from "mysql";

const dbPASSWORD = process.env.VITE_DB_PASSWORD;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: dbPASSWORD,
  database: "tmdb_db",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

export default db;
