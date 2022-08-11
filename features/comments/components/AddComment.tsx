import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "components/Icon/Icon";
import Loading from "components/Loading";
import TextArea from "components/TextArea";
import { useUser } from "features/authentications/contexts/user.context";
import { CreateCommentType } from "features/types";
import useCreateComment from "lib/useCreateComment";
import React, { useEffect, useState } from "react";
import { createComment } from "../services/comment.service";

function AddComment({ postId }: { postId: string }) {
  const { profile } = useUser();
  const [commentText, setCommentText] = useState("");
  const mutation = useCreateComment();

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };
  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutation.mutate({
      postId: postId,
      text: commentText,
      userId: profile!.userId,
      username: profile!.username,
      createdAt: Date.now(),
    });
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      setCommentText("");
    }
  }, [mutation.isSuccess]);

  return (
    <form onSubmit={formSubmitHandler} className="px-4">
      <div className="flex items-end gap-2 mt-4 relative">
        <TextArea
          value={commentText}
          aria-label="add comment"
          onChange={onChangeHandler}
          rows={1}
          placeholder="Add comment"
          className="rounded-none border-0 border-b outline-0 focus:border-gray-500 focus:outline-0 focus-visible:outline-0 text-sm pl-0 pr-8 py-1 focus:ring-0"
        ></TextArea>
        <button
          disabled={mutation.isLoading || commentText === ""}
          aria-label="post"
          className="absolute btn-icon right-0 w-8 h-8"
          type="submit"
        >
          {!mutation.isLoading && (
            <Icon iconCode="send" className={`${commentText === "" ? `text-gray-400` : ``}`} />
          )}
          {mutation.isLoading && <Loading className="p-2" />}
        </button>
      </div>
    </form>
  );
}

export default AddComment;
