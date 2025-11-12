import { CiLogin } from "react-icons/ci"
import { GoHome } from "react-icons/go"
import { MdOutlineAccountCircle } from "react-icons/md"
import { HiOutlineShoppingCart } from "react-icons/hi2"

import './styles/Menu.css'
import IconLink from "./menu/IconLink"
import { useEffect, useState } from "react"
import { useAuth, url } from "./auth/Auth"

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
              } catch (err) {
                console.log("Error in setToken:", err)
              }
              setIsValid(true)
            } else {
              localStorage.removeItem("token")
              setToken(null)
            }
          }
        } else {
          setIsValid(false)
        }
      } catch (err) {
        setIsValid(false)
      }
    }

    verifyToken()
  }, [token])

  return (
    <div className="w-full h-[4rem] bg-white border-b border-gray-200 shadow-sm flex items-center justify-end p-4 gap-4">

      <IconLink to="/" Icon={GoHome} />
      <IconLink to="cart" Icon={HiOutlineShoppingCart} />

      {isValid ? (
        <IconLink to="account" Icon={MdOutlineAccountCircle} />
      ) : (
        <IconLink to="login" Icon={CiLogin} />
      )}
    </div>
  )
}

export default Menu
