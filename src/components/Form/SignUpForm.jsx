import { useState } from "react";
import Pseudo from "./Pseudo";
import Password from "./Password";
import Confirmation from "./Confirmation";
import axios from "axios";

function SignUpForm() {
  const [inputStates, setInputStates] = useState({
    pseudo: "",
    password: "",
    passwordConfirmation: "",
  });

  const [showValidation, setShowValidation] = useState({
    pseudo: false,
    password: false,
    passwordConfirmation: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (ValidationCheck()) {
      const { pseudo, password } = inputStates;

      axios
        .post("http://localhost:3000/userData", {
          pseudo,
          password,
        })
        .then((response) => {
          console.log("data succesfully posted:", response.data);
          setInputStates({
            pseudo: "",
            password: "",
            passwordConfirmation: "",
          });
        });
    }
  }

  function ValidationCheck() {
    const areValid = {
      pseudo: false,
      password: false,
      passwordConfirmation: false,
    };

    if (inputStates.pseudo.length < 3 || inputStates.pseudo.length > 64) {
      setShowValidation((state) => ({ ...state, pseudo: true }));
    } else {
      areValid.pseudo = true;
      setShowValidation((state) => ({ ...state, pseudo: false }));
    }
    if (inputStates.password.length < 6 || !/\d/.test(inputStates.password)) {
      // regex des chiffres 0 a 9
      setShowValidation((state) => ({ ...state, password: true }));
    } else {
      areValid.password = true;
      setShowValidation((state) => ({ ...state, password: false }));
    }

    if (inputStates.passwordConfirmation !== inputStates.password) {
      setShowValidation((state) => ({
        ...state,
        passwordConfirmation: true,
      }));
    } else {
      areValid.passwordConfirmation = true;
      setShowValidation((state) => ({
        ...state,
        passwordConfirmation: false,
      }));
    }
    if (Object.values(areValid).every((value) => value)) {
      return true;
    } else {
      false;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto border p-10 rounded"
    >
      <p className="text-black text-xl mb-6">
        Créez votre nom d'utilisateur et votre mot de passe
      </p>
      <Pseudo
        inputStates={inputStates}
        setInputStates={setInputStates}
        showValidation={showValidation}
      />
      <Password
        inputStates={inputStates}
        setInputStates={setInputStates}
        showValidation={showValidation}
      />
      <Confirmation
        inputStates={inputStates}
        setInputStates={setInputStates}
        showValidation={showValidation}
      />
      <button className="mt-10 bg-slate-600 px-4 py-2 min-w-[125px] rounded text-white">
        Valider
      </button>
    </form>
  );
}
export default SignUpForm;
