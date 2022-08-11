import { Menu, Transition } from "@headlessui/react";
import Icon from "components/Icon/Icon";
import { useUser } from "features/authentications/contexts/user.context";
import { logout } from "features/authentications/services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

const MobileNav = ({ className = "" }: { className?: string }) => {
  const { profile } = useUser();
  const userId = profile.userId;
  const { asPath } = useRouter();
  const menuBtnRef = useRef<HTMLButtonElement>(null!);
  const onLogoutHandler = async () => {
    await logout();
    menuBtnRef.current.click();
  };

  const closeMenu = () => {
    menuBtnRef.current.click();
  };

  return (
    <nav
      className={`md:grow-[2] md:basis-0 md:flex md:justify-end sm:relative fixed bottom-0 w-full bg-gray-50 sm:bg-white border-t sm:border-0 sm:w-auto ${className}`}
    >
      <ul className="flex gap-4 sm:gap-2 justify-between px-4 py-2 sm:p-0 max-w-sm mx-auto sm:mx-0">
        <li>
          <Link href={"/"}>
            <a className={`btn-icon ${asPath === "/" ? "bg-gray-100" : ""}`}>
              <Icon
                iconCode={"home"}
                className={`${asPath === "/" ? "filled text-gray-900" : ""}`}
              />
            </a>
          </Link>
        </li>

        <li className="block">
          <Link href={"/search"}>
            <a className={`btn-icon ${asPath === "/search" ? "bg-gray-100" : ""}`}>
              <Icon
                iconCode={"explore"}
                className={`${asPath === "/search" ? "filled text-gray-900" : ""}`}
              />
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/create-post"}>
            <a className={`btn-icon ${asPath === "/create-post" ? "bg-gray-100" : ""}`}>
              <Icon
                iconCode={"add_circle"}
                className={`${asPath === "/create-post" ? "filled text-gray-900" : ""}`}
              />
            </a>
          </Link>
        </li>

        <li className="sm:hidden">
          <Link href={`/user/${userId}`}>
            <a className={`btn-icon ${asPath.startsWith("/user") ? "bg-gray-100" : ""}`}>
              <Icon
                iconCode={"person"}
                className={`${asPath.startsWith("/user") ? "filled text-gray-900" : ""}`}
              />
            </a>
          </Link>
        </li>
        <li className="hidden sm:block">
          <Menu as="div" className="relative z-20 inline-block text-left">
            <Menu.Button>
              <button ref={menuBtnRef} type="button" className="btn-icon" aria-label="More Actions">
                <Icon
                  iconCode={"person"}
                  className={`${asPath.startsWith("/user") ? "filled text-gray-900" : ""}`}
                />
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
                <Menu.Item>
                  <button
                    type="button"
                    className={`menu-item text-red-500`}
                    onClick={onLogoutHandler}
                  >
                    Log out
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <Link href={`/user/${profile.userId}`}>
                    <button type="button" className={`menu-item`} onClick={closeMenu}>
                      <span>Go to Profie</span>
                    </button>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button type="button" className={`menu-item`} onClick={closeMenu}>
                    Cancel
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>

        <li className="sm:hidden">
          <button aria-label="logout " type="button" className="btn-icon" onClick={onLogoutHandler}>
            <Icon iconCode={"logout"} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
