import { Loading } from "../components";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
function ProtectedUserPage({ children }) {
  const { user, isLoading } = useAppContext;
  // if (isLoading) return <Loading />;
  if (user && user.role !== "Auth") return <Navigate to="/" />;
  return <div>{children}</div>;
}
export default ProtectedUserPage;
