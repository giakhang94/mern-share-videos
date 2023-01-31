import { useEffect, useRef, useState } from "react";
import { Alert, FormRow, Loading } from "../../components";
import { MdAddCircle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../../context/appContext";

function AddPost() {
  const {
    displayAlert,
    showAlert,
    alertText,
    alertType,
    getAllThumb,
    allThumb,
    // reloadPage,
    isLoading,
    isDoneCreateVideo,
    createVideo,
  } = useAppContext();
  const categories = [
    "Kalama",
    "A Tỳ Đàm",
    "Truyện Phím",
    "Hỏi Đáp",
    "Kinh Tạng",
  ];
  //const baseURL
  const baseURL = "http://localhost:5000";

  //get thumnails
  useEffect(() => {
    getAllThumb();
  }, []);
  const [listTag, setListTag] = useState([]);
  const [input, setInput] = useState(""); //cái này dùng riêng cho add tag thôi
  const tagRef = useRef();
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    link: "",
    caption: "",
    thumb: "",
    category: "Kalama",
  });
  // console.log(`${baseURL}/api/v1/image/${inputValue.thumb}`);
  const handleChangeInput = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newInputArr = {
      ...inputValue,
      tag: [...listTag],
      thumb: `${baseURL}/api/v1/image/${inputValue.thumb}`,
    };
    createVideo(newInputArr);
    setTimeout(() => {
      setInputValue((prev) => ({
        ...prev,
        title: "",
        description: "",
        link: "",
        caption: "",
        thumb: "",
        category: "Kalama",
      }));
    }, 5000);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="add-user Plaptop:w-[500px] laptop:w-[500px] Ptablet:w-[500px] tablet:w-[400px] Pmobile:w-[350px] mobile:w-[280px] w-[250px]">
      <h3 className="text-slate-600 font-semibold text-xl tracking-[1.5px] text-center mb-3">
        Tạo Video Mới
      </h3>
      <form action="" onSubmit={handleSubmit}>
        {showAlert && isDoneCreateVideo && (
          <Alert alertText={alertText} alertType={alertType} />
        )}
        <div className="flex items-center justify-between Plaptop:flex-row laptop:flex-row Ptablet:flex-row tablet:flex-row flex-col">
          <FormRow
            type="text"
            name="title"
            labelText="Video Title"
            handleChange={handleChangeInput}
            value={inputValue.title}
          />
          <FormRow
            type="text"
            name="caption"
            labelText="Chữ trên thumnail"
            handleChange={handleChangeInput}
            value={inputValue.caption}
          />
        </div>
        <div>
          <FormRow
            type="text"
            name="description"
            labelText="Mô tả video"
            handleChange={handleChangeInput}
            value={inputValue.description}
          />
          <FormRow
            type="text"
            name="link"
            labelText="Link Youtube của Video"
            handleChange={handleChangeInput}
            value={inputValue.link}
          />
        </div>
        <div className="upload-img flex items-start mt-3">
          <div className="w-2/4 py-3">
            <label className="block text-slate-600 font-semibold tracking-[1.px] mb-1 rounded-sm">
              Chọn thumbnail cho video
            </label>
            <select
              name="thumb"
              onChange={handleChangeInput}
              id=""
              className="border-gray-300 border py-1 w-full  mb-2 outline-[#af6944c4]"
            >
              <option value="none">Chọn 1 ảnh</option>
              {allThumb.map((thumb, index) => {
                return (
                  <option
                    key={index + "thumb"}
                    className="truncate"
                    value={thumb._id.toString()}
                  >
                    {thumb.description}
                  </option>
                );
              })}
            </select>
          </div>
          {inputValue.thumb && inputValue.thumb !== "none" && (
            <div className="thumbPreviewer w-2/4 p-3 h-[200px] object-cover flex justify-center">
              <div className="h-full">
                <img
                  className="block h-full w-auto object-cover"
                  src={`${baseURL}/api/v1/image/${inputValue.thumb}`}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <label
          htmlFor="tag"
          className="block mt-3 mb-1 tracking-[1px] font-semibold text-slate-600"
        >
          Thêm tag cho Video
        </label>
        <div className="flex border border-gray-300 rounded-sm">
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
            <MdAddCircle className="text-[#ab7a5f] text-2xl p-[1px] cursor-pointer" />
          </button>
        </div>
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
        <label
          htmlFor="category"
          className="block mt-3 mb-1 tracking-[1px] font-semibold text-slate-600"
        >
          Chọn Category
        </label>
        <select
          name="category"
          onChange={handleChangeInput}
          id=""
          className="py-1 w-full outline-[#af6a44] border border-gray-300 mb-3"
        >
          {categories.map((cate, index) => {
            return (
              <option value={cate} key={index + "category"}>
                {cate}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="bg-[#af6a44] mb-10 text-white font-semibold tracking-[1.5px] w-full block py-1 mt-3 rounded-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddPost;
