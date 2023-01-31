import { useAppContext } from "../context/appContext";
import { CiUser } from "react-icons/ci";
import { FiUserPlus, FiMenu, FiLogOut } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { MdAddCircleOutline, MdOutlineDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

function SmallSideBar() {
  const navigate = useNavigate();
  const activeStyle = { fontWeight: 600 };
  const state = useAppContext();
  const handleLogout = () => {
    state.hideSidebar();
    state.logout();
    navigate("/profile");
  };
  if (state.isAdmin) {
    return (
      <div className="sidebar absolute left-0 top-[60px] z-20  border-l-[#AB7A5F] border-l-[3px] ml-[1px] bg-white -mt-5 pt-10 px-5 space-y-5 shadow-sm shadow-gray-500  h-full w-[250px] text-sm">
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile/admin/all-users"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <CiUser />
          </span>
          Xem tất cả user
        </NavLink>
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile/admin/add-user"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <FiUserPlus />
          </span>
          Thêm user
        </NavLink>
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile/admin/all-posts"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <FiMenu />
          </span>
          Xem tất cả bài viết
        </NavLink>
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile/admin/add-post"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <MdAddCircleOutline />
          </span>
          Thêm bài viết
        </NavLink>
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile/admin/add-thumbnail"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <FaImages />
          </span>
          Thêm ảnh thumbnail
        </NavLink>
        <NavLink
          onClick={() => {
            state.hideSidebar();
          }}
          // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/profile"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600 "
        >
          <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
            <MdOutlineDashboard />
          </span>
          Quay về trang Profile
        </NavLink>
        <div
          // style={({ isActive }) => (isActive ? activeStyle : undefined)}
          onClick={handleLogout}
          to="/profile"
          className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600 "
        >
          <span className="mr-3 font-semibold bg-red-600 text-white text-lg block rounded-[50%] p-1">
            <FiLogOut />
          </span>
          Đăng Xuất
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar  absolute left-0 top-[60px] z-20  border-l-[#AB7A5F] border-l-[3px] ml-[1px] bg-white -mt-5 pt-10 px-5 space-y-5 shadow-sm shadow-gray-500  h-full w-[250px] text-sm">
      <NavLink
        onClick={() => {
          state.hideSidebar();
        }}
        to="/profile/user/add-post"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
      >
        <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
          <MdAddCircleOutline />
        </span>
        Thêm bài viết
      </NavLink>
      <NavLink
        onClick={() => {
          state.hideSidebar();
        }}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/profile/user/all-posts"
        className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600"
      >
        <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
          <FiMenu />
        </span>
        Xem tất cả bài viết
      </NavLink>
      <NavLink
        onClick={() => {
          state.hideSidebar();
        }}
        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/profile"
        className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600 "
      >
        <span className="mr-3 font-semibold bg-[#af6a44] text-white text-lg block rounded-[50%] p-1">
          <MdOutlineDashboard />
        </span>
        Quay về trang Profile
      </NavLink>
      <div
        onClick={handleLogout}
        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
        to="/profile"
        className="flex py-2 px-2 items-center text-md ml-2 tracking-[1px] cursor-pointer text-slate-600 "
      >
        <span className="mr-3 font-semibold bg-red-600 text-white text-lg block rounded-[50%] p-1">
          <FiLogOut />
        </span>
        Đăng Xuất
      </div>
    </div>
  );
}

export default SmallSideBar;
