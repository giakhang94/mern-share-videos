import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import FlexibleInput from "./FlexibleInput";
import { useAppContext } from "../context/appContext";
const UserCard = ({ name, userName, location, role, id, index }) => {
  const { updateUser, deleteUser } = useAppContext();
  const firstLetter = name[0];
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState({
    name,
    userName,
    location,
  });
  const handleChangeInput = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = (e) => {
    console.log(id);
    updateUser(
      {
        name: inputValue.name,
        userName: inputValue.userName,
        location: inputValue.location,
      },
      id
    );
  };
  const handleDelete = () => {
    deleteUser(id);
  };
  return (
    <div className="user-card m-1 shadow-md shadow-gray-300 px-5 py-5 rounded-md laptop:w-[290px] Ptablet:min-w-[230px] Ptablet:truncate w-[250px]">
      <div className="info flex flex-col items-start ">
        <div className="intital thumbnail flex items-center">
          <FlexibleInput
            type="p"
            className="mr-5 flex items-center justify-center bg-[#AF6A44] w-[60px] h-[60px] text-center text-white font-bold text-lg rounded-sm uppercase"
          >
            {firstLetter}
          </FlexibleInput>
          <div className="tracking-[1px]">
            <FlexibleInput
              name="name"
              type={isEdit ? "input" : "p"}
              handleChange={handleChangeInput}
              value={inputValue.name}
              className="font-semibold text-md truncate text-slate-700 Plaptop:truncate"
            >
              {name}
            </FlexibleInput>
            <FlexibleInput
              name="userName"
              type={isEdit ? "input" : "p"}
              handleChange={handleChangeInput}
              value={inputValue.userName}
              className="text-sm italic text-slate-500"
            >
              {userName}
            </FlexibleInput>
          </div>
        </div>
        <div className="separator w-full h-[1px] bg-gray-300 mt-3"></div>
        <div className="content mt-3 w-full">
          <div className="row-one flex items-center text-slate-600 w-full justify-between">
            <p className="flex items-center mr-10 text-sm">
              <span className="mr-2">
                <FaRegUser />
              </span>
              <span>{role}</span>
            </p>
            <p className="flex items-center text-sm">
              <span className="mr-2">
                <MdOutlineLocationOn />
              </span>
              <FlexibleInput
                name="location"
                type={isEdit ? "input" : "span"}
                value={inputValue.location}
                className="truncate w-[80px]"
                handleChange={handleChangeInput}
              >
                {location}
              </FlexibleInput>
            </p>
          </div>
          {!!role && (
            <div className="row-two flex items-center justify-between mt-3 w-full">
              {!isEdit ? (
                <button
                  className="text-sm bg-red-200 text-red-600 py-1 px-2 rounded-sm tracking-[1px] font-semibold"
                  onClick={handleDelete}
                >
                  Xoá user
                </button>
              ) : (
                <button
                  className="text-sm bg-red-200 text-red-600 py-1 px-2 rounded-sm tracking-[1px] font-semibold"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </button>
              )}
              {!isEdit ? (
                <button
                  className="text-sm bg-green-200 text-green-600 py-1 px-2 rounded-sm tracking[1px] font-semibold"
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                  }}
                >
                  Sửa user
                </button>
              ) : (
                <button
                  className="text-sm bg-green-200 text-green-600 py-1 px-2 rounded-sm tracking[1px] font-semibold"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserCard;
