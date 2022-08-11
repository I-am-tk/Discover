import Avatar from "components/Avatar";
import Loading from "components/Loading";
import Modal from "components/Modal";
import { useUser } from "features/authentications/contexts/user.context";
import useFileRemove from "lib/useFileRemove";
import useFileUpload from "lib/useFileUpload";
import useUpdateProfile from "lib/useUpdateProfile";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useWarnIfUnsavedChanges } from "hooks/useWarnIfUnsavedChanges";
import AddPhotoIcon from "@material-symbols/svg-400/rounded/add_a_photo.svg";
import config from "config";
function UpdateProfileModal({ onClose }: { onClose: () => void }) {
  const { profile } = useUser();

  // It will open up a modal
  const [previewUserImageURL, setPreviewImageURL] = useState(
    profile.userProfileImage || config.defaultUserImage
  );
  const [previewBackgroundImageURL, setPreviewBackgroundImageURL] = useState(
    profile.backgroundImage
  );
  const [bio, setBio] = useState(profile.bio);
  const userImageRef = useRef<HTMLInputElement>(null!);
  const backgroundImageRef = useRef<HTMLInputElement>(null!);

  const profileUpdateMutation = useUpdateProfile();
  const fileUploadMutation = useFileUpload();
  const fileRemoveMutation = useFileRemove();
  useWarnIfUnsavedChanges(
    profileUpdateMutation.isLoading || fileUploadMutation.isLoading || fileRemoveMutation.isLoading,
    "Do you want to leave? It is being updated!!"
  );

  const isLoading =
    profileUpdateMutation.isLoading || fileUploadMutation.isLoading || fileRemoveMutation.isLoading;

  const onImageFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const tempURL = URL.createObjectURL(file);
    if (name === "backgroundImage") {
      setPreviewBackgroundImageURL(tempURL);
    } else {
      setPreviewImageURL(tempURL);
    }
  };

  const bioChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const onSubmitHandler = async () => {
    let userProfileImage = profile.userProfileImage;
    let userProfileImagePath = profile.userProfileImagePath;

    let backgroundImage = profile.backgroundImage;
    let backgroundImagePath = profile.backgroundImagePath;
    try {
      // userImage
      if (userImageRef.current.files && profile.userProfileImage !== previewUserImageURL) {
        // need to delete the previous and add new one
        const userImageFile = userImageRef.current.files[0];
        if (profile.userProfileImagePath !== "") {
          await fileRemoveMutation.mutateAsync(profile.userProfileImagePath);
        }
        const result = await fileUploadMutation.mutateAsync({
          userId: profile.userId,
          file: userImageFile,
        });
        userProfileImage = result.downloadURL;
        userProfileImagePath = result.imagePath;
      }

      if (
        backgroundImageRef.current.files &&
        profile.backgroundImage !== previewBackgroundImageURL
      ) {
        const backgroundImageFile = backgroundImageRef.current.files[0];
        if (profile.backgroundImagePath !== "") {
          await fileRemoveMutation.mutateAsync(profile.backgroundImagePath);
        }
        const result = await fileUploadMutation.mutateAsync({
          userId: profile.userId,
          file: backgroundImageFile,
        });
        backgroundImage = result.downloadURL;
        backgroundImagePath = result.imagePath;
      }

      await profileUpdateMutation.mutateAsync({
        ...profile,
        userProfileImage,
        userProfileImagePath,
        backgroundImage,
        backgroundImagePath,
        bio,
      });
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  return (
    <Modal title="Update Profile" closeModal={!isLoading ? onClose : () => {}}>
      <div className="w-full">
        <div className="relative p-4 md:rounded  aspect-[3] bg-gradient-to-bl from-indigo-500 to-purple-500">
          {/* add photo background image */}
          {previewBackgroundImageURL && (
            <div className="absolute inset-0 overflow-hidden rounded">
              <Image
                layout="fill"
                src={previewBackgroundImageURL}
                objectFit={"cover"}
                objectPosition={"center"}
                alt=""
                priority
              />
            </div>
          )}
          <div>
            <div className="absolute top-2 right-2 z-10">
              <label className="block">
                <input
                  type="file"
                  name="backgroundImage"
                  className=""
                  aria-label="choose an user image"
                  hidden
                  ref={backgroundImageRef}
                  onChange={onImageFileChangeHandler}
                />
                <span className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center  border">
                  <AddPhotoIcon viewBox="0 0 48 48" className="w-8" />
                </span>
              </label>
            </div>
            {/* user image and add user image */}
            <div className="shrink-0 avatar-lg rounded-full absolute -bottom-7 border-2 border-white ">
              <div>
                <label>
                  <input
                    type="file"
                    name="userImage"
                    className=""
                    aria-label="choose an user image"
                    hidden
                    onChange={onImageFileChangeHandler}
                    ref={userImageRef}
                  />
                  <span className="bg-gray-200 border border-gray-400 z-10 px-2 py-1 absolute left-8 top-6 w-max text-sm rounded">
                    Change profile image
                  </span>
                </label>
              </div>
              <Avatar className="avarat-lg" avatarURL={previewUserImageURL || "/user.png"} />
            </div>
          </div>
        </div>
        <div className="mt-14">
          <p className="font-medium text-lg">{profile.fullName}</p>
          <p>{profile.username}</p>
          <div className="mt-4">
            <label htmlFor="bio" className="text-sm text-gray-500 mb-2 block">
              Bio :
            </label>
            <textarea
              id="bio"
              placeholder="Add bio"
              aria-label="bio"
              className="w-full border p-2 rounded"
              value={bio}
              onChange={bioChangeHandler}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            type="button"
            className="px-3  py-2 rounded min-w-[100px] hover:bg-red-100 focus:bg-red-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmitHandler}
            type="button"
            className="px-3 bg-indigo-600 text-white py-2 rounded min-w-[100px]"
          >
            Save
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100/50 z-40 flex justify-center items-center">
          <Loading className="w-10" />{" "}
        </div>
      )}
    </Modal>
  );
}

export default UpdateProfileModal;
