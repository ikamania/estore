import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
const url = "http://localhost:8000"


export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("tokens")) || null
  )
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const t = 1500

  const login = async (email, password) => {
    try {
      const response = await fetch(`${url}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data)
        setUser({ email })

        localStorage.setItem("token", JSON.stringify(data))

        Swal.fire({
          icon: "success",
          text: "logged in",
          timer: t
        })
        navigate("/")
      } else {
        Swal.fire({
          icon: "error",
          text: "invalid creadentials",
          timer: t
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: { error },
        timer: t
      })
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)

    localStorage.removeItem("token")

    Swal.fire({
      icon: "success",
      text: "logged out",
      timer: t
    })
    navigate("/")
  }

  const signup = async (email, username, password0, password1) => {
    if (!email || !username || !password0) {
      Swal.fire({
        icon: "error",
        text: "fill out all forms",
        timer: t
      })

      return
    }

    if (password0 !== password1) {
      Swal.fire({
        icon: "error",
        text: "passwords dont match",
        timer: t
      })

      return
    }

    try {
      const response = await fetch(`${url}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password0,
        })
      })

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "signed up",
          timer: t
        })
        navigate("/login")
      } else {
        Swal.fire({
          icon: "error",
          text: "error",
          timer: t
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: { error },
        timer: t
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup }}>
      {children}
    </ AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
