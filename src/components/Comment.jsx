import React, { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const commentRef = doc(db, "Articles", id);

  useEffect(() => {
    const unsubscribe = onSnapshot(commentRef, (snapshot) => {
      setComments(snapshot.data().comments || []);
    });

    return () => unsubscribe();
  }, [id]);

  const handleChangeComment = async (e) => {
    if ((e.type === "keyup" && e.key === "Enter") || e.type === "click") {
      if (comment.trim()) {
        await updateDoc(commentRef, {
          comments: arrayUnion({
            user: currentlyLoggedinUser.uid,
            userName: currentlyLoggedinUser.displayName,
            comment: comment,
            createdAt: new Date(),
            commentId: uuidv4(),
          }),
        });
        setComment("");
      }
    }
  };

  const handleDeleteComment = async (comment) => {
    await updateDoc(commentRef, {
      comments: arrayRemove(comment),
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Comments</h3>
        {comments.length > 0 && (
          <span className="text-sm text-gray-600">
            {comments.length} comments
          </span>
        )}
      </div>
      <div>
        {comments.map(({ commentId, user, comment, userName, createdAt }) => (
          <div
            key={commentId}
            className="flex justify-between items-center border p-2 mt-2 rounded-md bg-white"
          >
            <div>
              <span className="font-bold">{userName}</span>: {comment}
            </div>
            {user === currentlyLoggedinUser?.uid && (
              <i
                className="fa fa-times cursor-pointer text-red-500"
                onClick={() =>
                  handleDeleteComment({
                    user,
                    userName,
                    comment,
                    createdAt,
                    commentId,
                  })
                }
              ></i>
            )}
          </div>
        ))}
        {currentlyLoggedinUser && (
          <div className="flex mt-4 mb-5">
            <input
              type="text"
              className="form-control flex-grow rounded-l-md py-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="  Add a comment..."
              onKeyUp={handleChangeComment}
            />
            <button
              onClick={handleChangeComment}
              className="bg-black text-white rounded-r-md px-4"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
