import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import DeleteArticle from "./DeleteArticle";

const Articles = () => {
  const [articles, setArticles] = useState([]);

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
        articles.map(({ id, title, description, image, createdAt }) => (
          <div
            className="border mt-3 p-3 bg-white rounded-md shadow-sm max-w-2xl mx-auto"
            key={id}
          >
            <h2 className="font-bold capitalize text-xl mb-2 text-black">{title}</h2>
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt={title}
                className="w-full rounded-md h-[300px]"
              />
              <h4 className="capitalize text-sm mt-3">{description}</h4>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500 text-xs">
                {createdAt.toDate().toDateString()}
              </p>
              <DeleteArticle id={id} imageUrl={image} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;
