import { useState } from "react";
import { useAppContext } from "../context/appContext";
import AddTag from "./AddTag";
import FlexibleInput from "./FlexibleInput";
import SmallLoading from "./SmallLoading";

function VideoCard({ data }) {
  const {
    isUpdating,
    updateVideo,
    reloadPage,
    showModal,
    hideModal,
    saveTag,
    isEditTag,
    // isEditTag,
    tagList,
    deleteVideo,
    page,
  } = useAppContext();
  //state
  const { isAdmin } = useAppContext();
  const [isEdit, setIsEdit] = useState({ isEdit: false, isEditTag: false });
  // const [isEditTag, setIsEditTag] = useState(false);
  const [inputData, setInputData] = useState({
    title: data.title,
    description: data.description,
    caption: data.caption,
  });
  const handleChangeInput = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = () => {
    console.log(tagList);
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
            {isAdmin && !isEdit.isEditTag && (
              <FlexibleInput
                type={"span"}
                className="truncate max-w-[150px] absolute py-[3] px-2 bg-[#AF6A44] opacity-80 text-white font-semibold tracking-[1px] top-1 right-1 rounded-md"
              >
                By: {data.creatorName || "Auth"}
              </FlexibleInput>
            )}
            {!isEdit.isEdit && (
              <FlexibleInput
                type={isEdit.isEdit ? "input" : "span"}
                className={`text-lg bg-blue-500 absolute bottom-[20%] px-2 py-[3px] m-1 text-white font-semibold opacity-80 rounded-md`}
                value={inputData.caption}
              >
                {data.caption}
              </FlexibleInput>
            )}
          </div>
          <div className="info px-1 mt-1">
            {isEdit.isEdit && (
              <label className="text-sm text-slate-700 font-semibold">
                Title:
              </label>
            )}
            <a href={isEdit.isEdit ? "#" : data.link}>
              <FlexibleInput
                name="title"
                value={inputData.title}
                handleChange={handleChangeInput}
                type={isEdit.isEdit ? "input" : "p"}
                className="font-bold tracking-[1px] text-left text-slate-700 truncate text-sm"
              >
                {data.title}
              </FlexibleInput>
            </a>
            {isEdit.isEdit && (
              <label className="text-sm text-slate-700 font-semibold">
                Description:
              </label>
            )}
            <FlexibleInput
              name="description"
              value={inputData.description}
              handleChange={handleChangeInput}
              type={isEdit.isEdit ? "input" : "p"}
              className="italic text-sm text-left text-slate-500 truncate"
            >
              {data.description}
            </FlexibleInput>
            {isEdit.isEdit && (
              <>
                {isEdit.isEdit && (
                  <label className="text-sm text-slate-700 font-semibold">
                    Caption:
                  </label>
                )}
                <FlexibleInput
                  name="caption"
                  handleChange={handleChangeInput}
                  type={isEdit.isEdit ? "input" : "span"}
                  className={`text-lg bg-blue-500 absolute bottom-[20%] px-2 py-[3px] m-1 text-white font-semibold opacity-80 rounded-md`}
                  value={inputData.caption}
                >
                  {data.caption}
                </FlexibleInput>
              </>
            )}
            <label className="text-sm text-slate-700 font-semibold mt-1">
              Eidt tags
            </label>
            {isEdit.isEditTag && <AddTag data={data.tag} />}

            <div className="btn flex items-center justify-between mx-1 my-1">
              {!isEdit.isEdit ? (
                <button
                  className="px-2 py-1 bg-red-200 text-red-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    deleteVideo(data._id, page);
                  }}
                >
                  Xoá
                </button>
              ) : (
                <button
                  className="px-2 py-1 bg-red-200 text-red-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    // hideModal();
                    setIsEdit((prev) => ({ isEdit: false, isEditTag: false }));
                  }}
                >
                  Cancel
                </button>
              )}

              {!isEdit.isEdit ? (
                <button
                  className="px-2 py-1 bg-green-200 text-green-500 tracking-[1.5px] font-semibold rounded-sm cursor-pointer"
                  onClick={() => {
                    setIsEdit((prev) => ({
                      ...prev,
                      isEdit: true,
                      isEditTag: true,
                    }));
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
