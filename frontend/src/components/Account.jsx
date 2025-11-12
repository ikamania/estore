import './styles/Account.css'
import pfp from '../assets/pfp.jpg'
import Product from "./product/Product.jsx"
import Loading from "./Loading.jsx"

import { CiLogout } from "react-icons/ci"

import { url, useAuth } from "./auth/Auth.jsx"
import { useEffect, useState } from 'react'


const Account = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])

  const { token, logout } = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${url}/users/me/`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        setUser(data)
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: { error },
          timer: 2000,
        })
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await fetch(`${url}/products/`, {
          headers: {
            Authorization: `Bearer ${token.access}`
          }
        })

        if (!res.ok) {
          throw new Error("failed to fetch user products")
        }

        const data = await res.json()
        setProducts(data)
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: { error },
          timer: 2000,
        })
      }
    }

    fetchMyProducts()
  }, [token])

  const handleLogout = async () => {
    await logout()
  }

  if (!user) {
    return (
      <Loading text="WAITING" />
    )
  }

  return (
    <div className="px-[1rem] h-[90%] flex flex-col gap-[1rem] bg-white">
      <div className="w-full flex flex-row justify-between items-center text-2xl font-semibold">
        <h1 className="text-gray-800">Account</h1>
        <CiLogout
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 cursor-pointer text-2xl transition-colors"
        />
      </div>

      <div className="info-box h-[15%] flex justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="h-full aspect-square rounded-full overflow-hidden flex items-center">
          <img src={pfp} alt="cant load" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center ml-4">
          <h1 className="text-gray-800 font-semibold truncate">{user.email}</h1>
          <h1 className="text-gray-600 truncate">{user.username}</h1>
        </div>
      </div>

      <div className="info-box flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="flex justify-between items-center font-bold mb-2">
          <h1 className="text-gray-800 text-lg">MY PRODUCTS</h1>
          <a
            href="/add_product"
            className="p-1 cursor-pointer text-red-500 hover:text-red-400 transition-colors"
          >
            ADD PRODUCT
          </a>
        </div>

        <div className="flex overflow-x-auto gap-3">
          {products.length === 0 ? (
            <p className="text-center w-full text-gray-500">No products found</p>
          ) : (
            products.map(prod => (
              <Product
                key={prod.id}
                id={prod.id}
                image={prod.image}
                price={`${prod.price}`}
                text={prod.name}
              />
            ))
          )}
        </div>
      </div>
    </div>

  )
}

export default Account
