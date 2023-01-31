import { Outlet } from "react-router-dom";
import { SideBar, SmallSideBar } from "../../components";
import { useAppContext } from "../../context/appContext";

const ShareLayout = () => {
  const { sidebar } = useAppContext();
  return (
    <div className="sharelayout flex">
      <SideBar />
      {sidebar && <SmallSideBar />}
      <div className=" flex-1 w-full">
        <div className="dashboard flex justify-center w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default ShareLayout;
