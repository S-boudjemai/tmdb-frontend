router.get(
  "/checkUser/:id_firebase",
  (
    req: { params: { id_firebase: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { exists: boolean }): any; new (): any };
      };
    }
  ) => {
    console.log("requête reçu checkuser");

    const { id_firebase } = req.params;
    // check user est appelé au login avec un id, et ici on extraie cet id
    console.log("id : ", id_firebase);

    const sql = "SELECT * FROM users WHERE id_firebase = ? ";
    // chercher l'id ddans la database
    db.query(sql, [id_firebase], (err: any, result: string | any[]) => {
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
  }
);

module.exports = router;
