import logo from "../assets/images/logo-findy.png";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <div className="logo  max-w-[300px] items-center p-3 ml-2 flex">
      <Link to="/">
        <div className="h-auto w-[150px]">
          <img className="h-auto w-full" src={logo} alt="" />
        </div>
      </Link>
    </div>
  );
}
export default Logo;
