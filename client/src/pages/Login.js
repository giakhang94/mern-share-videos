import { Alert, FormRow, Loading, Logo, SmallLoading } from "../components";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/android-chrome-512x512.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const {
    user,
    userName,
    password,
    handleChange,
    login,
    showAlert,
    alertText,
    alertType,
    isLoading,
  } = useAppContext();
  const handleChangeInput = (e) => {
    handleChange({ [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { userName, password };
    login(loginData);
    handleChange({ password: "" });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <div className="flex items-center justify-center my-3 ">
      <form
        onSubmit={handleSubmit}
        action=""
        className="login-form flex flex-col items-center Plaptop:w-[350px] laptop:w-[350px] Ptablet:w-[350px] tablet:w-[300px] Pmobile:w-[280px] mobile:w-[280px] Psmallmobile:w-[280px] smallmobile:w-[230px] border border-gray-300 px-8 py-5 rounded-sm  bg-white"
      >
        <div className="flex items-center mb-5">
          <Link to="/">
            <div className="h-12 w-12">
              <img src={logo} alt="" className="h-full w-full" />
            </div>
          </Link>
          <h3 className="text-center ml-3 text-xl text-slate-700 font-semibold">
            Login
          </h3>
        </div>
        <h3 className="text-center text-[11px] text-slate-700 font-semibold">
          Demo: username: admin - pw: 123456Abc
        </h3>
        {showAlert && <Alert alertType={alertType} alertText={alertText} />}
        <p className="text-sm text-gray-400">
          Chức năng nảy chỉ sử dụng cho Quản trị viên
        </p>
        <FormRow
          name="userName"
          type="text"
          value={userName}
          handleChange={handleChangeInput}
          labelText="User"
        />
        <FormRow
          name="password"
          type="password"
          value={password}
          handleChange={handleChangeInput}
          labelText="Password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full block bg-[#885522] my-4 py-1 text-white tracking-[1.5px]"
        >
          <span>{isLoading ? <SmallLoading /> : "Login"}</span>
        </button>
      </form>
    </div>
  );
}

export default Login;
