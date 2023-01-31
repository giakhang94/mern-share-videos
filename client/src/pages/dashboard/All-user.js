import { useAppContext } from "../../context/appContext";
import { Alert, Loading, UserCard } from "../../components/";
import { useEffect } from "react";
function AllUser() {
  const {
    isLoading,
    listUser,
    getAllUser,
    reloadPage,
    showAlert,
    alertText,
    alertType,
  } = useAppContext();
  useEffect(() => {
    getAllUser();
  }, [reloadPage]);
  if (isLoading) return <Loading />;
  return (
    <div>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}
      <div className="grid Plaptop:grid-cols-3 laptop:grid-cols-2 Ptablet:grid-cols-2 grid-cols-1 gap-5">
        {listUser &&
          listUser.map((user, index) => {
            return (
              <UserCard
                id={user._id}
                key={index}
                name={user.name}
                location={user.location}
                userName={user.userName}
                role={user.role}
              />
            );
          })}
      </div>
    </div>
  );
}
export default AllUser;
