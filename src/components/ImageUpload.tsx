import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { auth, storage } from "../firebase/firebase";
import GetImageProfil from "./GetImageProfil";
import { useAuth } from "../contexts/authContext";

function ImageUpload({}) {
  const [image, setImage] = useState<File | null>(null);
  const { setImageURL } = useAuth();

  const handleClick = async () => {
    if (image && auth.currentUser) {
      const userId = auth.currentUser.uid;
      const imageRef = ref(storage, `profileImages/${userId}`);

      await uploadBytes(imageRef, image);

      const DownloadURL = await getDownloadURL(imageRef);
      console.log(DownloadURL);

      setImageURL(DownloadURL);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <GetImageProfil className="rounded-full w-32 h-32 border-4 border-gray-300 shadow-md" />
      <div className="mt-6 w-full max-w-sm">
        <input
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <button
          onClick={handleClick}
          className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition-all duration-200"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
export default ImageUpload;
