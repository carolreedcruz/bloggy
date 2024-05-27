import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { MdDelete } from "react-icons/md";

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
        className=" text-gray-500 rounded-lg p-[0.5rem] hover:text-gray-800 focus:outline-none"
        onClick={handleDelete}
      >
        <MdDelete size={24} />
      </button>
    </div>
  );
};

export default DeleteArticle;

