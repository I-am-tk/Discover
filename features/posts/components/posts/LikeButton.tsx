import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { PostType, PostWithCommentsType } from "features/types";
import useToggleLike from "lib/useToggleLike";
import FavoriteIcon from "@material-symbols/svg-400/rounded/favorite.svg";
import FilledFavoriteIcon from "@material-symbols/svg-400/rounded/favorite-fill.svg";
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
      className={`btn-icon hover:bg-transparent ${
        hasLiked ? "text-red-500" : "enabled:hover:text-red-500 transition-colors duration-100"
      }`}
      disabled={mutation.isLoading}
      onClick={toggleLike}
    >
      {mutation.isLoading && <Loading className="w-5 text-red-500" />}
      {!mutation.isLoading && !hasLiked && <FavoriteIcon viewBox="0 0 48 48" />}
      {!mutation.isLoading && hasLiked && <FilledFavoriteIcon viewBox="0 0 48 48" />}
    </button>
  );
}

export default LikeButton;
