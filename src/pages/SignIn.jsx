import { useEffect, useState } from "react";
import SignInForm from "../components/Form/SignInForm";
import axios from "axios";
import SignUpForm from "../components/Form/SignUpForm";

function SignIn({ isLogged, setIsLogged }) {
  const [userData, setUserData] = useState([]);
  const [alreadySign, setAlreadySign] = useState(true);

  const getData = () => {
    axios
      .get("http://localhost:3000/userData")
      .then((res) => setUserData(res.data));
  };

  useEffect(() => getData(), []);

  return (
    <div className="w-full h-screen flex  justify-center items-center flex-col">
      {isLogged ? <p>vous êtes connecté</p> : null}
      {alreadySign ? (
        <div>
          <SignInForm isLogged={isLogged} setIsLogged={setIsLogged} />
          <p className="pt-5">
            Pas encore inscrit ?{" "}
            <span
              className="cursor-pointer text-lg  font-semibold  hover:underline"
              onClick={() => setAlreadySign(!alreadySign)}
            >
              Cliquez-ici
            </span>{" "}
            pour créer un compte
          </p>
        </div>
      ) : (
        <div>
          <SignUpForm isLogged={isLogged} setIsLogged={setIsLogged} />
          <span
            className="cursor-pointer text-lg  font-semibold  hover:underline "
            onClick={() => setAlreadySign(!alreadySign)}
          >
            Connectez-vous !
          </span>
        </div>
      )}
    </div>
  );
}
export default SignIn;
