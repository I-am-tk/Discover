import Icon from "components/Icon/Icon";
import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { PostType, PostWithCommentsType } from "features/types";
import useToggleLike from "lib/useToggleLike";

function LikeButton({ post }: { post: PostWithCommentsType | PostType }) {
  const { profile } = useUser();
  const userId = profile.userId;
  const hasLiked = post.likes.includes(userId);

  const mutation = useToggleLike();

  const toggleLike = () => {
    mutation.mutate({ userId, postId: post.id });
  };

  return (
    <button
      type="button"
      className="btn-icon hover:bg-transparent"
      disabled={mutation.isLoading}
      onClick={toggleLike}
    >
      {mutation.isLoading && <Loading className="w-5 text-red-500" />}
      {!mutation.isLoading && (
        <Icon
          iconCode="favorite"
          className={`${hasLiked ? `filled text-red-500` : ``} ${
            !hasLiked ? "hover:text-red-500" : ""
          }`}
        />
      )}
    </button>
  );
}

export default LikeButton;
