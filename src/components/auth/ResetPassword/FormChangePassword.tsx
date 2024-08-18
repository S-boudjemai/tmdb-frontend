import { useState } from "react";
import { resetPassword } from "./ResetPassword";
import React from "react";

function FormChangePassword({}) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errorDiff, setErrorDiff] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    if (passwordConfirmation !== newPassword) {
      e.preventDefault();
      setErrorDiff(true);
      setSuccess(null);
    } else {
      e.preventDefault();
      setError(null);
      setSuccess(null);
      setErrorDiff(false);
      setCurrentPassword("");
      setPasswordConfirmation("");
      setNewPassword("");

      try {
        await resetPassword(currentPassword, newPassword);
        setSuccess("Password changed successfully !");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Change Password
        </h2>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Mot de passe actuel
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Confirmer
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
        {errorDiff && (
          <p className="text-red-500 text-center mt-4">
            Les mots de passe ne sont pas identiques
          </p>
        )}
      </form>
    </div>
  );
}
export default FormChangePassword;
