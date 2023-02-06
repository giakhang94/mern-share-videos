import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const SearchHome = ({ showResultCount }) => {
  const { tagSearch, category, getAllVideoHome } = useAppContext();

  const [searchValue, setSearch] = useState({ tag: "", category: "all" });
  const handleChangeInput = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // setSearchValue({ ...searchValue });
  useEffect(() => {
    const delayHandler = setTimeout(() => {
      getAllVideoHome(searchValue.tag, searchValue.category);
      showResultCount(tagSearch);
    }, 800);
    return () => {
      clearTimeout(delayHandler);
    };
  }, [searchValue.tag, searchValue.category]);
  return (
    <div className="search w-full mb-5 p-3">
      <form
        action=""
        className=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center    mr-2">
          <select
            name="category"
            id=""
            className="block w-2/4 border border-gray-300 p-1 rounded-sm text-sm"
            onChange={handleChangeInput}
          >
            <option value="all">all</option>
            {category &&
              category.map((cate, index) => {
                return (
                  <option value={cate} key={index + "cate search"}>
                    {cate}
                  </option>
                );
              })}
          </select>
          <input
            name="tag"
            className="block w-2/4 ml-2 border border-gray-300 p-1 rounded-sm text-sm"
            placeholder="enter tag, exp: thien, test, Ha noi..."
            type="text"
            onChange={handleChangeInput}
            value={searchValue.tag}
          />
        </div>
        {/* <button>SEARCH</button> */}
      </form>
    </div>
  );
};
export default SearchHome;
