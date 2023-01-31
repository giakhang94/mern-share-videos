import { useAppContext } from "../context/appContext";
import Alert from "./Alert";
import { AiOutlineClose, AiFillSave, AiFillCloseCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { useRef, useState } from "react";

function EditTagModal({ tags }) {
  const {
    hideModal,
    isEditTag,
    alertType,
    alertText,
    showAlert,
    displayAlert,
    saveTag,
  } = useAppContext();
  const [input, setInput] = useState("");
  const [listTag, setListTag] = useState([...tags]);
  const tagRef = useRef();
  const handleSaveTag = (e) => {
    e.preventDefault();
    hideModal();
    saveTag(listTag);
  };
  return (
    <div className="p-2 rounded-md border border-gray-300 w-[90%] m-2 absolute top-[30%] z-10 bg-white -translate-y-[50%] left-[50%] -translate-x-[51%]">
      <span
        className="text-red-500 float-right text-lg p-[1px] block cursor-pointer"
        onClick={() => {
          hideModal();
        }}
      >
        <AiFillCloseCircle className="" />
      </span>
      <h3 className="text-center font-semibold text-lg text-slate-600 mb-2">
        Chỉnh sửa tags cho video
      </h3>

      <div className="tag-container flex space-x-3 flex-wrap mt-1 mb-2 w-full  ">
        {isEditTag && showAlert && (
          <Alert alertText={alertText} alertType={alertType} />
        )}
        {listTag &&
          listTag.length > 0 &&
          listTag.map((tag, index) => {
            return (
              <p key={index} className="grid grid-cols-auto relative m-1">
                <span className="bg-[#bb937daf] px-2 py-[1px] pr-4 block rounded-md">
                  {tag}
                </span>
                <span
                  className="ml-1 cursor-pointer text-sm absolute right-[1px] top-[1px]  text-white font-bold rounded-[50%]"
                  onClick={() => {
                    const Arr = [...listTag];
                    Arr.splice(index, 1);
                    setListTag(Arr);
                  }}
                >
                  <AiOutlineClose className="font-bold" />
                </span>
              </p>
            );
          })}
      </div>
      <form className="flex border border-gray-300 rounded-sm">
        <input
          ref={tagRef}
          name="tag"
          type="text"
          className="p-1 block w-full outline-none"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            if (listTag.length >= 20) {
              displayAlert("danger", "Không thể tạo nhiều hơn 20 tag");
            } else {
              const Arr = [...listTag];
              const isExisted = Arr.find((tag) => input === tag);
              if (input === "" || input.trim().length === 0) {
                displayAlert("danger", "Xin đừng add tag rỗng ạ!");
              } else {
                if (!isExisted) {
                  setListTag((prev) => [...prev, input]);
                } else {
                  displayAlert("danger", "Tag này vừa được thêm");
                }
              }
            }
            tagRef.current.focus();
            setInput("");
          }}
        >
          <MdAddCircle className="text-[#ab7a5f] text-2xl p-[1px] cursor-pointer" />
        </button>
        <button
          className="text-green-500 text-2xl p-[1px] cursor-pointer"
          onClick={handleSaveTag}
        >
          <AiFillSave />
        </button>
      </form>
    </div>
  );
}
export default EditTagModal;
