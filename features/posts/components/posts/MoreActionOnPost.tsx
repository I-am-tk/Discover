import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import Link from "next/link";
import { PostType, PostWithCommentsType } from "features/types";
import { useUser } from "features/authentications/contexts/user.context";
import useDeletePost from "lib/useDeletePost";
import Modal from "components/Modal";
import Loading from "components/Loading";
import { useRouter } from "next/router";

function MoreActionOnPost({ post }: { post: PostType | PostWithCommentsType }) {
  const { profile } = useUser();
  const isFollowing = profile.following.includes(post.userId);
  const myPost = post.userId === profile.userId;
  const router = useRouter();
  const isPostDetailedPage = router.pathname === "/post/[postId]";
  const mutaionPost = useDeletePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deletePostHandler = () => {
    mutaionPost.mutate({
      postId: post.id,
      userId: profile.userId,
      postImagePath: post.portImgPath,
      profileId: profile.id,
    });
  };

  useEffect(() => {
    if (mutaionPost.isSuccess) {
      setTimeout(() => {
        router.replace("/");
      }, 750);
    }
  }, [mutaionPost.isSuccess, router]);

  const closeModal = () => setShowDeleteModal(false);
  const showModal = () => setShowDeleteModal(true);
  return (
    <React.Fragment>
      <Menu as="div" className="relative z-20 inline-block text-left">
        <Menu.Button>
          <button type="button" className="btn-icon" aria-label="More Actions">
            <Icon iconCode="more_horiz" />
          </button>
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="py-2 absolute z-50  right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {myPost && (
              <Menu.Item>
                <button type="button" className={`menu-item`} onClick={showModal}>
                  <span className={` text-red-500`}>Delete Post</span>
                </button>
              </Menu.Item>
            )}

            {myPost && (
              <Menu.Item>
                <Link href={`/post/${post.id}/update`}>
                  <a className={`menu-item`}>
                    <span>Edit Post</span>
                  </a>
                </Link>
              </Menu.Item>
            )}
            <Menu.Item>
              <Link href={`/post/${post.id}`}>
                <a className={`menu-item`}>
                  <span>Go to Post</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button type="button" className={`menu-item`}>
                Cancel
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      {showDeleteModal && (
        <Modal title="Confirm Deletion" closeModal={mutaionPost.isLoading ? () => {} : closeModal}>
          {(mutaionPost.isLoading || mutaionPost.isIdle) && (
            <div>
              {mutaionPost.isLoading && (
                <div className="absolute inset-0 bg-gray-100/40 flex justify-center items-center">
                  <Loading className="w-10" />
                </div>
              )}
              <p className="text-lg">Delete this post</p>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  disabled={mutaionPost.isLoading}
                  className="hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  disabled={mutaionPost.isLoading}
                  className="bg-red-600 hover:bg-red-800 gap-2 text-gray-50 py-2 px-4 rounded flex"
                  type="button"
                  onClick={deletePostHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {mutaionPost.isSuccess && <div>Post Deleted</div>}
        </Modal>
      )}
    </React.Fragment>
  );
}

export default MoreActionOnPost;
