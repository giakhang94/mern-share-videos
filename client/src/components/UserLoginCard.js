import { useAppContext } from "../context/appContext";

function UserLoginCard() {
  const { logout } = useAppContext();
  return (
    <div className="user-card">
      Profile
      <div
        onClick={() => {
          logout();
        }}
        className="user-card-logout bg-[#be947d] text-white font-semibold py-[3px] px-1 rounded-sm text-sm hidden"
      >
        Logout
      </div>
    </div>
  );
}
export default UserLoginCard;
