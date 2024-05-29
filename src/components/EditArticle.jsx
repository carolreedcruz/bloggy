import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, "Articles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const articleData = docSnap.data();
        setFormData(articleData);
        if (articleData.userId === user.uid) {
          setIsAuthor(true);
        } else {
          toast.error("You do not have permission to edit this article.");
          navigate("/");
        }
      } else {
        toast.error("No such document!");
        navigate("/");
      }
    };

    if (user) {
      fetchArticle();
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill all the fields");
      return;
    }

    const articleRef = doc(db, "Articles", id);
    try {
      await updateDoc(articleRef, formData);
      toast.success("Article updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating article");
      console.error("Error updating article:", error); // Add this line for debugging
    }
  };

  if (!user) {
    return <div>Please log in to edit your article</div>;
  }

  if (!isAuthor) {
    return <div>You do not have permission to edit this article.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400"
      />
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Description
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-200 focus:border-gray-400"
      ></textarea>
      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Update
      </button>
    </div>
  );
};

export default EditArticle;
