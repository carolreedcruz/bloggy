import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const AddArticle = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}_${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        toast.error(`Upload error: ${err.message}`);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              image: url,
              createdAt: Timestamp.now().toDate(),
              createdBy:user.displayName,
              userId:user.uid,
              likes:[],
              comments:[],
            })
              .then(() => {
                toast.success("Article added successfully!");
                setProgress(0);
                setFormData({
                  title: "",
                  description: "",
                  image: null,
                  createdAt: Timestamp.now().toDate(),
                });
              })
              .catch((err) => {
                toast.error(`Error adding article: ${err.message}`);
              });
          })
          .catch((err) => {
            toast.error(`Error getting download URL: ${err.message}`);
          });
      }
    );
  };

  return (
    <div className="border p-3 mt-3  bg-white fixed top-20 left-0 right-0 w-full md:w-auto md:left-auto md:right-auto md:ml-10 md:mt-10 rounded-md shadow-sm z-10">
      {!user ? (
        <>
        <h2 className="text-xl font-bold hover:text-gray-600 mb-3"> <Link to="/signin" className="underline">Login to create post</Link></h2>
         
          Dont have an account? <Link to="/register" className="underline hover:text-gray-600">Sign Up</Link>
        </>
      ) : (
        <>
          {" "}
          <h2 className="capitalize font-bold text-xl ">Create Article</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control flex mb-3 h-[2rem] rounded-md bg-gray-100 border px-2 "
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control flex w-[300px] mb-3 rounded-md h-[5rem] bg-gray-100 border px-2 py-1"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="image" className="flex mb-2 ">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control flex mb-3 file:bg-gray-300 file:text-black file:rounded-md file:hover:bg-gray-600 file:hover:text-white file:hover:cursor-pointer file:border-none"
            onChange={handleImageChange}
          />
          {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`Uploading image ${progress}%`}
              </div>
            </div>
          )}
          <button
            className="form-control w-full bg-black text-white rounded-lg p-[0.5rem] mb-2 font-semibold text-lg"
            onClick={handlePublish}
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
};

export default AddArticle;
