import { useState } from "react";
import { useAppContext } from "../context/appContext";
import FlexibleInput from "./FlexibleInput";
import SmallLoading from "./SmallLoading";

function VideoCard({ data }) {
  const {
    isUpdating,
    updateVideo,
    reloadPage,
    showModal,
    hideModal,
    isEditTag,
    tagList,
    deleteVideo,
  } = useAppContext();
  //state
  const { isAdmin } = useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    title: data.title,
    description: data.description,
    caption: data.caption,
  });
  const handleChangeInput = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = () => {
    updateVideo({ ...inputData, tag: tagList }, data._id);
  };
  return (
    <div className="video-cards Plaptop:w-[300px] laptop:w-[250px] Ptablet:w-[250px] tablet:w-[280px] w-[250px] rounded-md shadow-md shadow-gray-500 min-w-[200px]  pb-3 m-2 mb-9">
      {isUpdating ? (
        <SmallLoading />
      ) : (
        <>
          <div className={`thumb-auth relative h-[180px]`}>
            <div className="rounded-md h-full ">
              <img
                src={data.thumbnail}
                alt=""
                className="rounded-md object-cover h-auto max-h-[180px] w-full"
              />
            </div>
            {isAdmin && (
              <FlexibleInput
                type={"span"}
                className="truncate max-w-[150px] absolute py-[3] px-2 bg-[#AF6A44] opacity-80 text-white font-semibold tracking-[1px] top-1 right-1 rounded-md"
              >
                Created by: {data.creatorName || "Auth"}
              </FlexibleInput>
            )}
            {!isEdit && (
              <FlexibleInput
                type={isEdit ? "input" : "span"}
                className={`text-lg bg-blue-500 absolute bottom-[20%] px-2 py-[3px] m-1 text-white font-semibold opacity-80 rounded-md`}
                value={inputData.caption}
              >
                {data.caption}
              </FlexibleInput>
            )}
          </div>
          <div className="info px-1 mt-1">
            <a href={isEdit ? "#" : data.link}>
              <FlexibleInput
                name="title"
                value={inputData.title}
                handleChange={handleChangeInput}
                type={isEdit ? "input" : "p"}
                className="font-bold tracking-[1px] text-left text-slate-700 truncate text-sm"
              >
                {data.title}
              </FlexibleInput>
            </a>
            <FlexibleInput
              name="description"
              value={inputData.description}
              handleChange={handleChangeInput}
              type={isEdit ? "input" : "p"}
              className="italic text-sm text-left text-slate-500 truncate"
            >
              {data.description}
            </FlexibleInput>
            {isEdit && (
              <FlexibleInput
                name="caption"
                handleChange={handleChangeInput}
                type={isEdit ? "input" : "span"}
                className={`text-lg bg-blue-500 absolute bottom-[20%] px-2 py-[3px] m-1 text-white font-semibold opacity-80 rounded-md`}
                value={inputData.caption}
              >
                {data.caption}
              </FlexibleInput>
            )}
            <div className="btn flex items-center justify-between mx-1 my-1">
              {!isEdit ? (
                <button
                  className="px-2 py-1 bg-red-200 text-red-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    deleteVideo(data._id);
                  }}
                >
                  Xoá
                </button>
              ) : (
                <button
                  className="px-2 py-1 bg-red-200 text-red-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    hideModal();
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </button>
              )}
              {isEdit && (
                <button
                  className="px-2 py-1 bg-blue-200 text-blue-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    showModal(data.tag);
                  }}
                >
                  Sửa Tag
                </button>
              )}
              {!isEdit ? (
                <button
                  className="px-2 py-1 bg-green-200 text-green-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Sửa
                </button>
              ) : (
                <button
                  className="px-2 py-1 bg-green-200 text-green-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default VideoCard;
