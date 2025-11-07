import { CiLogin } from "react-icons/ci"
import { GoHome } from "react-icons/go"
import { MdOutlineAccountCircle } from "react-icons/md"

import './styles/Menu.css'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth, url } from "../auth/Auth"

const Menu = () => {
  const { token, setToken } = useAuth()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token?.access) {
          const verifyRes = await fetch(`${url}/api/token/verify/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token.access }),
          })

          if (verifyRes.ok) {
            setIsValid(true)
          }
        } else {
          const refreshToken = token.refresh

          const refreshRes = await fetch(`${url}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          })
          if (refreshRes.ok) {
            const data = await refreshRes.json()

            const updatedToken = {
              ...token,
              access: data.access,
            }

            localStorage.setItem("token", JSON.stringify(updatedToken))
            try {
              setToken(updatedToken)
              console.log("hree")
            } catch (err) {
              console.log("Error in setToken:", err)
            }
            setIsValid(true)
          } else {
            localStorage.removeItem("token")
            setToken(null)
          }
        }
      } catch (err) {
        setIsValid(false)
      }
    }

    verifyToken()
  }, [token, setToken])

  return (
    <div className="w-full min-h-[3.5rem] h-[10%] border-b-[0.05rem] justify-end flex items-center p-[1rem] gap-[.3rem]">
      <Link to="/">
        <GoHome />
      </Link>

      {isValid ? (
        <Link to="/account">
          <MdOutlineAccountCircle />
        </Link>
      ) : (
        <Link to="/login">
          <CiLogin />
        </Link>
      )}
    </div>
  )
}

export default Menu
