import Posts from "features/posts/components/posts/Posts";
import type { NextPageWithLayout } from "./_app";
import UserSuggestions from "features/user/components/UserSuggestions";

const Home: NextPageWithLayout = () => {
  return (
    <div className="xs:p-4 md:py-8">
      <div className="mx-auto max-w-screen-md  flex justify-center sm:gap-4 md:gap-10">
        <div className="max-w-md w-full">
          <Posts />
        </div>
        <div className="shrink-0 border bg-white grow  self-start hidden md:block">
          <UserSuggestions />
        </div>
      </div>
    </div>
  );
};

Home.isClient = true;

export default Home;
