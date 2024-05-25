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
            className="border mt-3 p-3 bg-gray-200 rounded-md shadow-sm"
            key={id}
          >
            <div className="flex flex-row">
              <div className="flex flex-col">
                <img
                  src={image}
                  alt={title}
                  className="h-[180px] w-[250px] rounded-md"
                />
              </div>
              <div className="w-3/4 pl-3">
                <h2 className="font-bold capitalize text-xl">{title}</h2>
                <p className="text-gray-500 text-xs">
                  {createdAt.toDate().toDateString()}
                </p>
                <h4 className="capitalize text-sm">{description}</h4>
                <DeleteArticle id={id} imageUrl={image} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;
