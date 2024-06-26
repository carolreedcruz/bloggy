import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import LikeArticle from "./LikeArticle";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            image,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div
              className="border mt-3 p-3 bg-white rounded-md shadow-sm max-w-2xl mx-auto p-6"
              key={id}
            >
              <div className="flex justify-between items-center">
                <Link to={`/article/${id}`}>
                  <h2 className="font-bold capitalize text-xl mb-1 text-black hover:text-gray-700">
                    {title}
                  </h2>
                </Link>
                {user && user.uid === userId && (
                  <div className="flex space-x-2">
                    <Link to={`/edit/${id}`}>
                      <button className="text-gray-500 rounded-lg p-[0.5rem] hover:text-gray-800 focus:outline-none">
                        <MdEdit size={24} />
                      </button>
                    </Link>
                    <DeleteArticle id={id} imageUrl={image} />
                  </div>
                )}
              </div>
              {createdBy && (
                <span className="bg-yellow-200 rounded-md text-black p-1 font-bold text-xs shadow-sm mb-2 inline-block mb-3">
                  {createdBy}
                </span>
              )}
              <div className="flex flex-col items-center">
                <img
                  src={image}
                  alt={title}
                  className="w-full rounded-md h-[300px] object-cover mb-1"
                />

                <h4 className="capitalize text-sm mt-3 mb-6">{description}</h4>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-xs">
                  {createdAt.toDate().toDateString()}
                </p>
                <div className="flex flex-row-reverse">
                  {user && <LikeArticle id={id} likes={likes} />}
                  <div className="pe-2">
                    <p>{likes?.length} likes</p>
                  </div>
                  {comments && comments.length > 0 && (
                    <div className="pe-2 text-s">
                      <p>{comments?.length} comments</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Articles;
