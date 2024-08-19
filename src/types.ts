import { User as FirebaseUser } from "firebase/auth";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  popularity: number;
  runtime?: number;
  backdrop_path: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  popularity: number;
}

export interface Credits {
  cast: Actor[];
}
export interface AuthContextType {
  isEmailUser: boolean;
  currentUser: FirebaseUser | null;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
  imageURL: string | null;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
}
export interface Genre {
  id: number;
  name: string;
}
