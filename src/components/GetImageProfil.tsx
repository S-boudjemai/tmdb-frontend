import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../contexts/authContext";

function GetImageProfil({ className }: { className?: string }) {
  const { imageURL, setImageURL } = useAuth();

  useEffect(() => {
    const fetchImage = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
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
