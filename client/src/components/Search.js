import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const Search = ({ showResultCount }) => {
  const {
    tagSearch,
    categorySearch,
    setSearchValue,
    category,
    isLoading,
    getAllVideo,
  } = useAppContext();

  const searchValue = { tag: tagSearch, category: categorySearch };
  const handleChangeInput = (e) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const delayHandler = setTimeout(() => {
      getAllVideo(tagSearch, categorySearch);
      showResultCount(tagSearch);
    }, 800);
    return () => {
      clearTimeout(delayHandler);
    };
  }, [tagSearch, categorySearch]);
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
            placeholder="Tìm video theo tag..."
            type="text"
            onChange={handleChangeInput}
            value={tagSearch}
          />
        </div>
        {/* <button>SEARCH</button> */}
      </form>
    </div>
  );
};
export default Search;
