import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/firebase";
import spinner from "../assets/spinner.svg";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../contexts/authContext";

function GetImageProfil({ className }) {
  const { imageURL, setImageURL } = useAuth();
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchImage = async () => {
      if (auth.currentUser) {
        const imageRef = ref(storage, `profileImages/${userId}`);

        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      }
    };

    fetchImage();
  }, [imageURL]);

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt="Profile" className={`${className}`} />
      ) : null}
    </div>
  );
}
export default GetImageProfil;
