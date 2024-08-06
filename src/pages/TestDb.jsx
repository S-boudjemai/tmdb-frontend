import React, { useState } from "react";

const TestDb = () => {
  const [id_user, setIdUser] = useState("");
  const [email_user, setEmailUser] = useState("");
  const [password_user, setPasswordUser] = useState("");
  const [favorites_user, setFavoritesUser] = useState("");

  const handleRequest = async (method, url, data = null) => {
    // fonction asynchrone qui prends method HTTP (post, delete, put, get), l'url et la data (données à envoyer)
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      // créer un objet options pour la requête fetch spécifiant la méthode HTTP et le contenu
    };
    if (data) {
      // si data, les convertir en json et les ajouter au corps de la requête (options.body)
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(url, options);
      // tente d'éffectuer la requête avec fetch
      const result = await response.json();
      console.log(result);
      alert(JSON.stringify(result));
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }
  };

  const createUser = () => {
    handleRequest("POST", "http://localhost:8081/new_table", {
      id_user,
      email_user,
      password_user,
      favorites_user,
    });
  };

  const readUsers = () => {
    handleRequest("GET", "http://localhost:8081/new_table");
  };

  const updateUser = () => {
    handleRequest("PUT", `http://localhost:8081/new_table/${id_user}`, {
      // NE PAS OUBLIER POUR PUT OU DELETE DE POINTER L ID
      email_user,
      password_user,
      favorites_user,
    });
  };

  const deleteUser = () => {
    handleRequest("DELETE", `http://localhost:8081/new_table/${id_user}`);
  };

  return (
    <div className="flex flex-col text-center">
      <h1>CRUD Operations</h1>
      <form className="flex flex-col items-center">
        <div>
          <label>
            User ID:
            <input
              className="ml-3 mt-2 border rounded border-black"
              type="text"
              value={id_user}
              onChange={(e) => setIdUser(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              className="ml-3 mt-2 border rounded border-black"
              type="text"
              value={email_user}
              onChange={(e) => setEmailUser(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              className="ml-3 mt-2 border rounded border-black"
              type="password"
              value={password_user}
              onChange={(e) => setPasswordUser(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Favorites:
            <input
              className="ml-3 mt-2 border rounded border-black"
              type="text"
              value={favorites_user}
              onChange={(e) => setFavoritesUser(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button
            className="border p-3 rounded shadow-lg m-3"
            type="button"
            onClick={createUser}
          >
            Create User
          </button>
          <button
            className="border p-3 rounded shadow-lg m-3"
            type="button"
            onClick={readUsers}
          >
            Read Users
          </button>
          <button
            className="border p-3 rounded shadow-lg m-3"
            type="button"
            onClick={updateUser}
          >
            Update User
          </button>
          <button
            className="border p-3 rounded shadow-lg m-3"
            type="button"
            onClick={deleteUser}
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestDb;
