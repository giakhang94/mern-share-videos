import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import UserLoginCard from "./UserLoginCard";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

function Header() {
  const { showSidebar, hideSidebar, sidebar } = useAppContext();
  const { user, isLogin } = useAppContext();
  const handleShowSidebar = () => {
    showSidebar();
  };
  return (
    <div className="header relative h-[60px] flex items-center justify-between bg-white shadow-sm shadow-gray-300 mb-5 px-3">
      <div className="flex-1 laptop:flex Ptablet:flex hidden">
        <Logo />
      </div>
      <div
        className=" items-center z-10 cursor-pointer laptop:hidden tablet:flex Ptablet:hidden mobile:flex Pmobile:flex smallmobile:flex Psmallmobile:flex"
        onClick={handleShowSidebar}
      >
        <span>
          <BsLayoutSidebarInset className=" text-xl text-[#af6a44] mx-3" />
        </span>
        <span className="text-slate-700 tracking-[1.5px] ">Show sidebar</span>
      </div>
      <div className="mobile-menu text-3xl text-[#af6a44] p-1 laptop:hidden Ptablet:hidden ">
        <AiOutlineMenu />
        <nav className="mobile-sub-menu justify-around space-y-5 p-5 items-center shadow-md shadow-gray-300 w-full text-slate-600 tracking-[1.2px] hidden text-lg ">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/about">About</Link>
          </div>
          <div>
            {user && user.role === "Admin" ? (
              <Link to="/profile">{isLogin ? <UserLoginCard /> : "Login"}</Link>
            ) : (
              <Link to="/profile">{isLogin ? <UserLoginCard /> : "Login"}</Link>
            )}
          </div>
        </nav>
      </div>
      <nav className="items-center justify-around min-w-[500px] text-slate-600 tracking-[1.2px] laptop:flex Ptablet:flex hidden ">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          {user && user.role === "Admin" ? (
            <Link to="/profile">{isLogin ? <UserLoginCard /> : "Login"}</Link>
          ) : (
            <Link to="/profile">{isLogin ? <UserLoginCard /> : "Login"}</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
