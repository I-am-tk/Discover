import { highlightHastag } from "components/utils/formatHastag";
import { CommentType } from "features/types";
import React, { useState } from "react";

function Comments({ comments }: { comments: CommentType[] }) {
  // get all the comments for the post don't need to listen
  const [showAll, setShowAll] = useState(false);
  const commentsToShow = showAll ? comments : comments.slice(0, 2);

  const showAllCommentHandler = () => {
    setShowAll((p) => !p);
  };

  let commentsHeader = null;

  if (comments.length != 0 && comments.length <= 2)
    commentsHeader = <p className="text-gray-400 py-1  px-2 -mx-2">comments</p>;

  if (comments.length > 2)
    commentsHeader = (
      <button
        onClick={showAllCommentHandler}
        type="button"
        className="text-gray-400 py-1  px-2 -mx-2"
      >
        {!showAll ? "View all comments" : "Hide all comments"}
      </button>
    );

  return (
    <div className="space-y-1 px-4  mt-4">
      {commentsHeader}
      {commentsToShow.map((comment) => (
        <div key={comment.id} className="flex">
          {/* Avatar */}
          {/* do i need it */}
          {/* <div className="">
            <Avatar avatarURL="/user.jpg" className="avatar-sm" />
          </div> */}
          <p className="text-sm">
            {/* UserName */}
            <span className="font-semibold mr-1">{comment.username}</span> {/* Comment */}
            {highlightHastag(comment.text)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
