import { useEffect, useState } from "react";
import { Loading, PaginationHome, SearchHome } from "../components";
import VideoCardHome from "../components/VideoCardHome";
import { useAppContext } from "../context/appContext";

function Home() {
  const [tag, setTag] = useState("");
  const {
    allVideos,
    total,
    numOfPages,
    isLoading,
    isEditTag,
    page,
    tagSearch,
    categorySearch,
    getAllVideoHome,
  } = useAppContext();
  useEffect(() => {
    getAllVideoHome(tagSearch, categorySearch, page);
  }, [page]);
  //saving tags
  const showResultCount = (tag) => {
    setTag(tag);
  };
  return (
    <div className="w-full px-10 pl-12">
      <SearchHome showResultCount={showResultCount} />
      <div className={isEditTag ? "relative" : "w-full min-h-[350px]"}>
        {isLoading ? (
          <Loading />
        ) : allVideos.length === 0 ? (
          <span className="text-center block text-slate-600 font-semibold text-lg -mt-2">
            {tag ? (
              <span>Không tìm thấy video nào có tag "{tag}"</span>
            ) : (
              <span>Không tìm thấy video nào</span>
            )}
          </span>
        ) : (
          <>
            <span className="text-left ml-4 mb-3 -mt-2 block text-slate-600 font-semibold text-md">
              {`Có ${allVideos.length} kết quả `}
              {tag && (
                <span>
                  cho tag <span className="italic font-bold">"{tag}"</span>
                </span>
              )}
            </span>
            <div className="all-post grid gap-3 w-full px-2 Plaptop:grid-cols-3 laptop:grid-cols-2 Ptablet:grid-cols-2 tablet:grid-cols-2 grid-cols-1 place-items-center">
              {allVideos &&
                allVideos.map((video, index) => {
                  return (
                    <VideoCardHome key={index + "videocard"} data={video} />
                  );
                })}
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center my-5">
        <PaginationHome total={total} numOfPages={numOfPages} />
      </div>
    </div>
  );
}
export default Home;
