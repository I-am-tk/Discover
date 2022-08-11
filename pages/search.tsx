import SearchUser from "components/SearchUser";
import ExplorePostGrid from "features/posts/components/post-grid/ExplorePostGrid";

function Search() {
  return (
    <div className="px-4 mx-auto md:pb-8 md:pt-4">
      <div className="group relative block my-4 md:hidden sm:max-w-sm">
        <SearchUser />
      </div>
      <ExplorePostGrid />
    </div>
  );
}

export default Search;
