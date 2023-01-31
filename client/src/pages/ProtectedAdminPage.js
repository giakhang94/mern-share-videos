// import { Loading } from "../components";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
function ProtectedAdminPage({ children }) {
  const { user, isLoading } = useAppContext();
  // if (isLoading) return <Loading />;
  if (user && user.role !== "Admin") return <Navigate to="/" />;
  return <div>{children}</div>;
}

export default ProtectedAdminPage;
