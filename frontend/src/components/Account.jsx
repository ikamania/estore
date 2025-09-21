import './styles/Account.css'
import pfp from '../assets/pfp.jpg'

import { CiLogout } from "react-icons/ci"

import { useAuth } from "../auth/Auth"
import { useEffect, useState } from 'react'


const Account = () => {
  const [user, setUser] = useState(null)
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)

  const url = "http://localhost:8000"

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${url}/users/me/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.access}`,
          },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        setUser(data)
        console.log(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return <p>loading</p>
  }

  return (
    <div className="px-[1rem] w-full h-full flex flex-col gap-[1rem]">
      <h1 className="text-[2rem]">Account</h1>

      <div className="info-box h-[15%] flex items-center">
        <div className="h-full aspect-square rounded-full overflow-hidden flex items-center">
          <img src={pfp} alt="cant load" className=""></img>
        </div>

        <div>
          <h1>{user.email}</h1>
          <h1>{user.username}</h1>
        </div>
      </div>

      <div className="info-box h-[40%]">

      </div>

      <div className="info-box h-[20%]">

      </div>
    </div >
  )
}

export default Account
