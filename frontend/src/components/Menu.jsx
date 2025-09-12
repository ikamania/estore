import { CiLogin } from "react-icons/ci";
import { GoHome } from "react-icons/go";

import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="w-full min-h-[3rem] h-[10%] border-b-[0.05rem] justify-end flex items-center p-[1rem] gap-[.3rem]">
      <Link to="/">
        <GoHome className="w-[2.5rem] h-[2.5rem]" />
      </Link>

      <Link to="/login">
        <CiLogin className="w-[2.5rem] h-[2.5rem]" />
      </Link>
    </div>
  )
}

export default Menu
