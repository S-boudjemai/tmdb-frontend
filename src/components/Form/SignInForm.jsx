// import { useEffect, useState } from "react";
// import Password from "./Password";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SignInForm({ isLogged, setIsLogged }) {
//   const [data, setData] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSigningIn, setIsSigningIn] = useState(false);
//   const [inputStates, setInputStates] = useState({
//     pseudo: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const getData = () => {
//     axios
//       .get("http://localhost:3000/userData")
//       .then((res) => setData(res.data));
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const user = data.find(
//       (user) =>
//         user.pseudo === inputStates.pseudo &&
//         user.password === inputStates.password
//     );

//     if (user) {
//       setMessage("Connexion réussie!");
//       setMessage("Connexion réussie!");
//       setIsLogged(true);
//       console.log("isLogged a été mis à jour à:", true);
//       localStorage.setItem("userId", user.id);
//       navigate("/");

//       // Rediriger l'utilisateur ou effectuer d'autres actions ici
//     } else {
//       setMessage("Identifiant ou mot de passe incorrect.");
//     }
//   };

//   return (
//     <form
//       className="max-w-xl mx-auto border p-10 rounded "
//       onSubmit={handleSubmit}
//     >
//       <label htmlFor="userName" className="text-black">
//         {" "}
//         Entrez votre nom d'utilisateur
//       </label>
//       <input
//         type="text"
//         id="userName"
//         className="rounded w-full p-1 mt-2  border-2"
//         onChange={(e) =>
//           setInputStates({ ...inputStates, pseudo: e.target.value })
//         }
//       />
//       <label htmlFor="password" className="text-black inline-block mt-5">
//         {" "}
//         Entrez votre mot de passe
//       </label>
//       <input
//         type="password"
//         id="password"
//         className="rounded w-full p-1 mt-2  border-2"
//         onChange={(e) =>
//           setInputStates({ ...inputStates, password: e.target.value })
//         }
//       />
//       <button className="mt-10 bg-slate-600 px-4 py-2 min-w-[125px] rounded text-white mb-5">
//         Valider
//       </button>
//       {message === "Connexion réussie!" ? (
//         <p className="text-green-400">{message}</p>
//       ) : (
//         <p className="text-red-400">{message}</p>
//       )}
//     </form>
//   );
// }
// export default SignInForm;
