import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { doPasswordChange } from "../../../firebase/auth";

export const resetPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("User not logged in");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await doPasswordChange(newPassword);
    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error updating password", error);
    throw error;
  }
};
