import { useState } from "react";
import {
  Alert,
  FormRow,
  Loading,
  SideBar,
  SmallLoading,
} from "../../components";
import { useAppContext } from "../../context/appContext";

function Profile() {
  const { user, isLoading, updateUser, alertType, alertText, showAlert } =
    useAppContext();
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState({
    userName: (user && user.userName) || "",
    location: (user && user.location) || "",
  });
  const handleChangeInput = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSaveChange = (e) => {
    // e.preventDefault();
    setIsEdit(false);
    updateUser(
      {
        userName: inputValue.userName,
        location: inputValue.location,
        role: user.role,
      },
      user._id
    );
  };

  return (
    <div className="profile flex mb-0 Plaptop:w-[500px] laptop:w-[500px] Ptablet:w-[500px] tablet:w-[400px] Pmobile:w-[350px] mobile:w-[280px] w-[250px]">
      {/* <div className="sidbar w-[300px] bg-blue-100 -mt-10">
        <SideBar />
      </div> */}
      <div className="content flex-1 flex flex-col items-center justify-center">
        <div className="form-user">
          <h3 className="text-center text-slate-700 font-semibold tracking-[1px]">
            Sadhu.. Xin Chào,
            <span> {(user && user.name) || "User"}!!</span>
          </h3>
          {showAlert && (
            <Alert
              alertType={alertType && alertType}
              alertText={alertText && alertText}
            />
          )}
          <form
            action=""
            className="laptop:w-[350px] Ptablet:w-[350px] tablet:w-[350px] Pmobile:w-[300px] Pmobile:text-sm mobile:w-[280px] mobile:text-sm Psmallmobile:w-[250px] Psmallmobile:text-sm smallmobile:w-[250px] smallmobile:text-sm"
          >
            <FormRow
              type="text"
              name="userName"
              labelText="Your user name"
              value={inputValue.userName}
              handleChange={handleChangeInput}
              disabled={!isEdit}
              inputColor={isEdit}
            />
            <FormRow
              handleChange={handleChangeInput}
              type="text"
              name="location"
              labelText="Your location"
              disabled={!isEdit}
              inputColor={isEdit}
              value={inputValue.location}
            />
          </form>
          <div className="edit-btn laptop:w-[350px] Ptablet:w-[350px] tablet:w-[350px] Pmobile:w-[300px] Pmobile:text-sm mobile:w-[280px] mobile:text-sm Psmallmobile:w-[250px] Psmallmobile:text-sm smallmobile:w-[250px] smallmobile:text-sm">
            {isEdit ? (
              <button
                className="w-full bg-green-400 text-white font-semibold tracking-[1.5px] mt-2 py-1 rounded-sm"
                onClick={handleSaveChange}
              >
                {isLoading ? <SmallLoading /> : "Save Changes"}
              </button>
            ) : (
              <button
                className="w-full bg-[#af6a44] text-white font-semibold tracking-[1.5px] mt-2 py-1 rounded-sm"
                onClick={() => {
                  setIsEdit((prev) => !prev);
                }}
              >
                {isLoading ? <SmallLoading /> : "Edit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
