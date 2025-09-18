import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { GoHome } from "react-icons/go";

import { Link } from "react-router-dom";

import { useAuth } from "../auth/Auth";

const Menu = () => {
  const { logout, token } = useAuth()

  const handleAuth = () => {
    if (token) {
      return (
        <CiLogout className="w-[2.5rem] h-[2.5rem] cursor-pointer" onClick={logout} />
      )
    } else {
      return (
        <Link to="/login">
          <CiLogin className="w-[2.5rem] h-[2.5rem]" />
        </Link>
      )
    }
  }

  return (
    <div className="w-full min-h-[3rem] h-[10%] border-b-[0.05rem] justify-end flex items-center p-[1rem] gap-[.3rem]">
      <Link to="/">
        <GoHome className="w-[2.5rem] h-[2.5rem]" />
      </Link>

      {handleAuth()}
    </div>
  )
}

export default Menu
