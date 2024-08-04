import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqpANfBlwffvv-9DFgp9xo92k11MM5bQQ",
  authDomain: "tmdb-api-project.firebaseapp.com",
  projectId: "tmdb-api-project",
  storageBucket: "tmdb-api-project.appspot.com",
  messagingSenderId: "77970078155",
  appId: "1:77970078155:web:b80716f256d5ce43c51e4e",
  measurementId: "G-3PLZVH9XQR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
