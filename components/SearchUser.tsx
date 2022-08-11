import useSearchUser from "lib/useSearchUser";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Icon from "./Icon/Icon";
import Loading from "./Loading";

function SearchUser() {
  const [searchText, setSearchText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchUser = useSearchUser(searchText);
  const refetchUsers = useCallback(searchUser.refetch, []);
  const isFirstRender = useRef(true);

  const [isOpen, setIsOpen] = useState(false);

  const openOverlay = () => setIsOpen(true);
  const closeOverlay = () => setIsOpen(false);

  const onTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const trackClickEvent = ({ target }: MouseEvent) => {
      if (!target) return;
      if (target instanceof HTMLElement) {
        const container = target.closest("#search-user-container");
        if (!container) {
          closeOverlay();
        }
      }
    };

    window.addEventListener("click", trackClickEvent);
    return () => window.removeEventListener("click", trackClickEvent);
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isInputFocused || searchText === "") return;
    const timerId = setTimeout(() => {
      refetchUsers();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchText, refetchUsers, isInputFocused]);

  return (
    <React.Fragment>
      <div className="relative group" id="search-user-container">
        <div className="relative peer">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <Icon iconCode="search" />
          </span>
          <input
            className="placeholder:italic  placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-14 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search"
            type="text"
            name="search"
            value={searchText}
            onChange={onTextChangeHandler}
            onFocus={() => {
              setIsInputFocused(true);
              openOverlay();
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
          />
          {/* group-focus-within:flex */}
          <span
            className={`group-focus-within:block hidden absolute inset-y-0 right-0  items-center pr-2`}
          >
            <button
              type="button"
              className="btn-icon"
              aria-label="clear"
              onClick={() => setSearchText("")}
            >
              <Icon iconCode="clear" />
            </button>
          </span>
        </div>
        {isOpen && (
          <div
            className={`bg-white block border py-4 px-4 rounded absolute top-12 z-40 shadow-md max-w-md w-full max-h-[50vh] overflow-y-auto overflow-x-hidden`}
          >
            {!searchUser.isFetching && (searchText === "" || !searchUser.isSuccess) && (
              <p className="text-gray-500 px-2">Search for user by username</p>
            )}
            {searchUser.isFetching && (
              <div className="py-2 flex items-center gap-2 bg-gray-100 rounded px-2">
                <Loading className="w-5 text-gray-500" />
                <span>Loading...</span>
              </div>
            )}
            {!searchUser.isFetching &&
              searchUser.isSuccess &&
              searchText !== "" &&
              searchUser.data.length !== 0 && (
                <div className="">
                  <p className="px-2 text-gray-500 mb-2">Users</p>
                  {searchUser.data.map((user) => (
                    <Link href={`/user/${user.userId}`} key={user.id}>
                      <a
                        onClick={() => closeOverlay()}
                        className="flex gap-4 items-center border-b last:border-b-0 py-2 hover:bg-gray-100 px-2 rounded"
                      >
                        <Avatar
                          className="avatar-md"
                          avatarURL={user.userProfileImage || "/user.png"}
                        />
                        <div>
                          <p className="text-gray-700">{user.fullName}</p>
                          <p className="text-sm text-gray-600">{user.username}</p>
                        </div>
                        <button type="button" className="hidden  sm:block  ml-auto">
                          see profile
                        </button>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            {!searchUser.isFetching &&
              searchUser.isSuccess &&
              searchUser.data.length === 0 &&
              searchText !== "" && (
                <div className="px-2 bg-gray-100 py-2">
                  <p>No user found!</p>
                </div>
              )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default SearchUser;
