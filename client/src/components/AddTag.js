import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { HIDE_TAGS_MODAL } from "../context/action";
import { useAppContext } from "../context/appContext";
import Alert from "./Alert";

export default function AddTag({ data }) {
  const tagRef = useRef();
  const [input, setInput] = useState("");
  const [listTag, setListTag] = useState([...data]);
  const {
    displayAlert,
    showAlert,
    alertText,
    alertType,
    isDoneCreateVideo,
    saveTag,
    hideModal,
  } = useAppContext();
  const handleSaveTag = (e) => {
    e.preventDefault();
    console.log("savetag");
    saveTag(listTag);
    hideModal();
  };
  return (
    <>
      <form className="flex border border-gray-300 rounded-sm">
        <input
          ref={tagRef}
          name="tag"
          placeholder="Type tag here and enter..."
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
              if (!isExisted) {
                setListTag((prev) => [...prev, input]);
              } else {
                displayAlert("danger", "Tag này vừa được thêm");
              }
            }
            tagRef.current.focus();
            setInput("");
          }}
        >
          <MdAddCircle className="text-[#ab7a5f] text-2xl p-[1px] cursor-pointer hidden" />
        </button>
        <button
          className="text-green-500 bg-green-200 text-md p-[1px] w-[100px] cursor-pointer"
          onClick={handleSaveTag}
        >
          Sửa xong
        </button>
      </form>
      <div className="tag-container flex space-x-3 flex-wrap mt-3">
        {showAlert && !isDoneCreateVideo && (
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
    </>
  );
}
