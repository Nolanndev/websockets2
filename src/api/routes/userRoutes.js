// Routes pour la gestion des utilisateurs

import app from "../../app";

app.get("/api/users", (req, res) => {
  res.json({ message: "Liste des utilisateurs" });
});