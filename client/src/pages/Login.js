import { Alert, FormRow, Logo } from "../components";
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
  } = useAppContext();
  const handleChangeInput = (e) => {
    handleChange({ [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { userName, password };
    login(loginData);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <div className="flex items-center justify-center my-3">
      <form
        onSubmit={handleSubmit}
        action=""
        className="login-form flex flex-col items-center border border-gray-300 px-8 py-5 rounded-sm  bg-white"
      >
        <div className="flex items-center mb-5">
          <Link to="/">
            <div className="h-12 w-auto">
              <img src={logo} alt="" className="h-full w-full" />
            </div>
          </Link>
          <h3 className="text-center ml-3 text-xl text-slate-700 font-semibold">
            Login
          </h3>
        </div>
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
          className="w-full block bg-[#885522] my-4 py-1 text-white tracking-[1.5px]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
