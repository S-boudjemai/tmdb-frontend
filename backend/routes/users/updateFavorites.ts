const router = express.Router();

router.put(
  "/users/favorites/:id_firebase",
  (
    req: { params: { id_firebase: any }; body: { favorites: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message: string }): any; new (): any };
      };
    }
  ) => {
    const { id_firebase } = req.params;
    let { favorites } = req.body;

    console.log("Requête PUT reçue pour ID:", id_firebase);
    console.log("Nouveaux favoris reçus:", favorites);

    const favoritesString = JSON.stringify(favorites);

    // Mettre à jour les favoris
    const sqlUpdate = "UPDATE users SET favorites = ? WHERE id_firebase = ?";
    // récupérer favorites string et les envoyé dans favoris
    db.query(
      sqlUpdate,
      [favoritesString, id_firebase],
      (err: any, result: any) => {
        if (err) {
          console.error("Erreur lors de la mise à jour des favoris :", err);
          return res.status(500).json(err);
        }
        console.log(
          "Favoris mis à jour dans la base de données:",
          favoritesString
        );
        return res.status(200).json({
          message: "Favoris mis à jour avec succès",
        });
      }
    );
  }
);

module.exports = router;
