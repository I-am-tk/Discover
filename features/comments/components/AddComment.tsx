import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import useCreateComment from "lib/useCreateComment";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import SendIcon from "@material-symbols/svg-400/rounded/send.svg";
const AddComment = React.forwardRef<{ focusAddComment: () => void }, { postId: string }>(
  ({ postId }, ref) => {
    const { profile } = useUser();
    const [commentText, setCommentText] = useState("");
    const mutation = useCreateComment();
    const textAreaRef = useRef<HTMLTextAreaElement>(null!);

    useImperativeHandle(ref, () => ({
      focusAddComment: () => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      },
    }));

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(e.target.value);
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
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
          <textarea
            className={`resize-none block w-full p-2 overflow-hidden rounded-none border-0 border-b outline-0 focus:border-gray-500 focus:outline-0 focus-visible:outline-0 text-sm pl-0 pr-8 py-1 focus:ring-0`}
            placeholder="Add comment"
            onChange={onChangeHandler}
            aria-label="add comment"
            value={commentText}
            rows={1}
            ref={textAreaRef}
          ></textarea>
          <button
            disabled={mutation.isLoading || commentText === ""}
            aria-label="post"
            className="absolute btn-icon right-0 w-8 h-8 bg-transparent"
            type="submit"
          >
            {!mutation.isLoading && (
              <SendIcon
                viewBox="0 0 48 48"
                className={`${commentText === "" ? `text-gray-400` : ``}`}
              />
            )}
            {mutation.isLoading && <Loading className="w-4" />}
          </button>
        </div>
      </form>
    );
  }
);

AddComment.displayName = "AddComment";

export default AddComment;
