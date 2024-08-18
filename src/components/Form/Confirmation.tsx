import React from "react";

function Confirmation({ inputStates, setInputStates, showValidation }) {
  return (
    <>
      <label htmlFor="confirmation" className="text-black inline-block mt-5">
        Confirmez votre mot de passe
      </label>
      <input
        id="confirmation"
        type="password"
        className="rounded w-full p-1 mt-2 border-2 "
        value={inputStates.passwordConfirmation}
        onChange={(e) =>
          setInputStates({
            ...inputStates,
            passwordConfirmation: e.target.value,
          })
        }
      />
      {showValidation.passwordConfirmation && (
        <p className="text-red-400 font-semibold">
          Les mots de passe ne sont pas identiques
        </p>
      )}
    </>
  );
}
export default Confirmation;
