import Icon from "components/Icon/Icon";
import Comments from "features/comments/components/Comments";
import AddComment from "features/comments/components/AddComment";
import { useUser } from "features/authentications/contexts/user.context";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { highlightHastag } from "components/utils/formatHastag";
import { PostType, PostWithCommentsType } from "features/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import useProfile from "lib/useProfile";

// whenever I store image I will make sure, I will store its size as well
function SinglePost({ post }: { post: PostWithCommentsType | PostType }) {
  const { isLoading, isError, data } = useProfile(post.userId);
  return (
    <div className={`xs:border bg-white pb-8 md:pb-0 rounded md:grid single-post-grid`}>
      {/* header */}
      <div className=" col-start-2">
        <PostHeader post={post} />
      </div>

      {/* image */}
      <div className="aspect-[4/5] overflow-hidden row-start-1 row-end-5">
        <PostImage imgUrl={post.postImgURL} />
      </div>
      {/* like, comment, save */}
      <div className="row-start-3">
        <div className="flex p-2">
          <div className="flex grow">
            <LikeButton post={post} />
            <button type="button" className="btn-icon" aria-label="comment">
              <Icon iconCode="chat_bubble" />
            </button>
          </div>
          <SaveButton post={post} />
        </div>
        <div className="px-4">
          <div className="mb-2">
            {/* Number of likes */}
            {post.likesCount > 0 && (
              <p className="font-semibold mb-2">
                {post.likesCount} like{post.likesCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
          {/* caption */}
        </div>
      </div>
      <div className="md:overflow-hidden md:relative">
        <div className="md:absolute md:inset-0 md:overflow-y-scroll md:no-scrollbar">
          <div className="md:border-t pt-4">
            <p className="text-base px-4">
              <span className="font-semibold">{data ? data.username : ""}</span>{" "}
              {highlightHastag(post.caption)}
            </p>

            {/* comment */}
            {"comments" in post && <Comments comments={post.comments} />}
          </div>
        </div>
      </div>
      <div className="col-start-2 md:py-2 md:pb-4">
        <AddComment postId={post.id} />
      </div>
    </div>
  );
}

export default SinglePost;
