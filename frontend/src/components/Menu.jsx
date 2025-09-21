import { CiLogin } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { MdOutlineAccountCircle } from "react-icons/md";

import './styles/Menu.css'

import { Link } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const Menu = () => {
  const { token } = useAuth()

  const handleAuth = () => {
    if (token) {
      return (
        <Link to="/account">
          <MdOutlineAccountCircle />
        </Link>
      )
    } else {
      return (
        <Link to="/login">
          <CiLogin />
        </Link>
      )
    }
  }

  return (
    <div className="w-full min-h-[3.5rem] h-[10%] border-b-[0.05rem] justify-end flex items-center p-[1rem] gap-[.3rem]">
      <Link to="/">
        <GoHome />
      </Link>

      {handleAuth()}
    </div>
  )
}

export default Menu
