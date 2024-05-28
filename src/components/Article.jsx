import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import DeleteArticle from "./DeleteArticle";
import LikeArticle from "./LikeArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdEdit } from "react-icons/md";
import Comment from "./Comment";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {article && (
        <div className="border mt-3 p-3 bg-white rounded-md shadow-sm max-w-2xl w-full p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold capitalize text-xl mb-1 text-black">
              {article.title}
            </h2>
            {user && user.uid === article.userId && (
              <div className="flex space-x-2">
                <Link to={`/edit/${id}`}>
                  <button className="text-gray-500 rounded-lg p-[0.5rem] hover:text-gray-800 focus:outline-none">
                    <MdEdit size={24} />
                  </button>
                </Link>
                <DeleteArticle id={id} imageUrl={article.image} />
              </div>
            )}
          </div>
          {article.createdBy && (
            <span className="bg-yellow-200 rounded-md text-black p-1 font-bold text-xs shadow-sm mb-2 inline-block mb-3">
              {article.createdBy}
            </span>
          )}
          <div className="flex flex-col items-center">
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-md h-[300px] object-cover mb-1"
            />
            <h4 className="capitalize text-sm mt-3 mb-6">
              {article.description}
            </h4>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 text-xs">
              {article.createdAt.toDate().toDateString()}
            </p>
            <div className="flex items-center space-x-1">
              {user && <LikeArticle id={id} likes={article.likes} />}
              <span className="text-gray-600">
                {article.likes.length} likes
              </span>
            </div>
          </div>

          <Comment id={article.id} />
        </div>
      )}
    </div>
  );
};

export default Article;
