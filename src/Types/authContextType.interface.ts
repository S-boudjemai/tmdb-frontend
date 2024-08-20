import { User as FirebaseUser } from "firebase/auth";

export interface AuthContextType {
  isEmailUser: boolean;
  currentUser?: FirebaseUser;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
  imageURL?: string;
  username?: string;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  userId?: string;
}
