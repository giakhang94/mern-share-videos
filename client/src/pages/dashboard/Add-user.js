import { useState } from "react";
import { Alert, FormRow, SmallLoading } from "../../components";
import { useAppContext } from "../../context/appContext";

function AddUser() {
  const state = useAppContext();
  const [inputValue, setInputValue] = useState({
    name: "",
    userName: "",
    password: "",
    role: "Auth",
  });
  const handleChangeInput = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    state.createUser(inputValue);
    setInputValue((prev) => ({
      ...prev,
      name: "",
      userName: "",
      password: "",
      role: "Auth",
    }));
  };
  return (
    <div className="add-user shadow-md shadow-gray-500 px-10 py-10 Pmobile:w-[280px] mobile:w-[280px] Psmallmobile:w-[250px] smallmobile:w-[250px] tablet:w-[350px] Ptablet:w-[350px] laptop:w-[350px] Plaptop:w-[350px] flex flex-col items-center">
      {/* <h3 className="text-center tracking-[1.5px] leading-1"></h3> */}
      {state.showAlert ? (
        <Alert
          alertType={state.alertType && state.alertType}
          alertText={state.alertText && state.alertText}
        />
      ) : (
        <div className="text-slate-700 font-bold text-lg leading-1 text-center tracking-[1.5px]">
          Tạo User Mới
        </div>
      )}
      <form action="" className="w-full" onSubmit={handleSubmit}>
        <FormRow
          labelText="Name"
          value={inputValue.name}
          name="name"
          type="text"
          handleChange={handleChangeInput}
        />
        <FormRow
          labelText="User name"
          value={inputValue.userName}
          name="userName"
          type="text"
          handleChange={handleChangeInput}
        />
        <FormRow
          labelText="Password"
          value={inputValue.password}
          name="password"
          type="password"
          handleChange={handleChangeInput}
        />
        <select
          className="mt-5 w-full bg-white py-1 border border-gray-300 rounded-sm"
          name="role"
          onChange={handleChangeInput}
          value={inputValue.role}
        >
          <option value="Admin">Admin</option>
          <option value="Auth">Auth</option>
        </select>
        <button className="w-full bg-[#ab7a5f] py-1 text-white font-semibold tracking-[1.5px] rounded-sm mt-5">
          {state.isLoading ? <SmallLoading /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
export default AddUser;
