import { useEffect, useState } from "react";
import {
  Alert,
  EditTagModal,
  Loading,
  Pagination,
  Search,
  VideoCard,
} from "../../components";
import { useAppContext } from "../../context/appContext";

function AllPosts() {
  const [tag, setTag] = useState("");
  const {
    allVideos,
    total,
    numOfPages,
    getAllVideo,
    isLoading,
    showAlert,
    alertType,
    alertText,
    reloadPage,
    isAdmin,
    isEditTag,
    tagList,
    page,
    tagSearch,
    categorySearch,
    getPostsByAuth,
    isDoneCreateVideo,
  } = useAppContext();
  useEffect(() => {
    getAllVideo(tagSearch, categorySearch, page);
  }, [page]);
  useEffect(() => {
    getAllVideo(tagSearch, categorySearch, page);
  }, [isDoneCreateVideo]);
  //saving tags
  const showResultCount = (tag) => {
    setTag(tag);
  };
  return (
    <div className="w-full">
      <Search showResultCount={showResultCount} />

      <div className={isEditTag ? "relative" : "w-full min-h-[350px]"}>
        {isEditTag && (
          <div
            className={`bg-black opacity-50 z-10 absolute w-full h-full rounded-md`}
          ></div>
        )}
        {isEditTag && <EditTagModal tags={tagList} />}
        {!isEditTag && showAlert && (
          <Alert alertType={alertType} alertText={alertText} />
        )}
        {isLoading ? (
          <Loading />
        ) : allVideos.length === 0 ? (
          <span className="text-center block text-slate-600 font-semibold text-lg -mt-2">
            Không tìm thấy video nào có tag "{tag}"
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
                  return <VideoCard key={index + "videocard"} data={video} />;
                })}
            </div>
          </>
        )}
      </div>
      <div className="flex place-content-center my-5">
        <Pagination total={total} numOfPages={numOfPages} />
      </div>
    </div>
  );
}
export default AllPosts;
