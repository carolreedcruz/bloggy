import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

const DeleteArticle = ({ id, imageUrl }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Articles", id));
      toast.success("Article deleted successfully!");

      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Error deleting article");
    }
  };

  return (
    <div>
      <button
        className="bg-red-600 text-white rounded-lg p-[0.5rem]"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteArticle;
