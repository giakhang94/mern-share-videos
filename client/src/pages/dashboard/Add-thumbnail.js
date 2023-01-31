import { useState } from "react";
import { MdPrivateConnectivity } from "react-icons/md";
import { Alert, FormRow } from "../../components";
import { useAppContext } from "../../context/appContext";
function AddThumbnail() {
  const { uploadThumbnail, showAlert, alertType, alertText } = useAppContext();
  const [inputValue, setInputValue] = useState({
    image: null,
    description: "",
  });
  const handleChangeInput = (e) => {
    if (e.target.name === "image") {
      setInputValue((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
    if (e.target.name === "description") {
      setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadThumbnail({
      thumb: inputValue.image,
      description: inputValue.description,
    });
  };
  return (
    <div className="shadow-gray-400 shadow-md px-8 pb-10 pt-5 Plaptop:w-[500px] laptop:w-[500px] Ptablet:w-[500px] tablet:w-[400px] Pmobile:w-[350px] mobile:w-[280px] w-[250px]">
      <form action="" method="post" onSubmit={handleSubmit} className="w-full">
        <h3 className="text-slate-600 font-semibold text-lg text-center tracking-[1.5px] mb-1">
          Upload Thumb
        </h3>
        {showAlert && <Alert alertType={alertType} alertText={alertText} />}
        <div className="separator w-full h-[1px] bg-gray-300 mb-3"></div>
        <FormRow
          type="file"
          name="image"
          labelText="Chọn một ảnh"
          // value={inputValue.image}
          handleChange={handleChangeInput}
        />
        <FormRow
          name="description"
          labelText="Nhập mô tả cho thumb"
          type="text"
          value={inputValue.description}
          handleChange={handleChangeInput}
        />
        <button
          type="submit"
          className="bg-[#AF6A44] text-white font-semibold tracking-[1px] py-1 block w-full rounded-sm mt-5"
        >
          UPLOAD
        </button>
      </form>
    </div>
  );
}

export default AddThumbnail;
