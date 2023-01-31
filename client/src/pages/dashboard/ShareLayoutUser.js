import { Outlet } from "react-router-dom";
import { SideBar, SmallSideBar } from "../../components";
import { useAppContext } from "../../context/appContext";

function ShareLayoutUser() {
  const { sidebar } = useAppContext();

  return (
    <div className="layoutUser flex">
      <SideBar />
      {sidebar && <SmallSideBar />}

      <div className="flex-1 flex intems-center justify-center">
        <div className="userDashboard w-full flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default ShareLayoutUser;
