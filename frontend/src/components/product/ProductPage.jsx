import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { url, useAuth } from "../auth/Auth"

import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Button from './Button'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [user, setUser] = useState(null)
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${url}/products/${id}/`, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: "failed to load product",
          timer: 1500,
        })
      }
    }

    const fetchUser = async () => {
      if (!token?.access) return

      try {
        const response = await fetch(`${url}/users/me/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        })
        if (!response.ok) throw new Error("failed to fetch user")

        const data = await response.json()

        setUser(data)
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: err.message,
          timer: 1500,
        })
      }
    }

    fetchUser()
    fetchProduct()
  }, [id])


  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "delete product?",
      text: "this action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "yes, delete it",
    })

    if (!confirm.isConfirmed) return

    try {
      const response = await fetch(`${url}/products/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.access}`,
        },
      })

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "product deleted successfully",
          timer: 1200,
        })

        navigate("/")
      } else {
        throw new Error("failed to delete product")
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
        timer: 1500,
      })
    }
  }

  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (!cart.includes(id)) {
      cart.push(id)
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }

  if (!product) {
    return <h1>Loading</h1>
  }

  return (
    <div className="h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-3 text-gray-800">
                  {product.name}
                </h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-[1.2rem] mt-2 font-semibold text-gray-800">
                  <span className="text-[.8rem] relative -top-1 text-gray-500">GEL</span>{" "}
                  {product.price}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                {user && user.id === product.user && (
                  <Button onClick={handleDelete} text="Delete product" className="bg-red-600 hover:bg-red-700" />
                ) || (
                    <Button onClick={handleAdd} text="Add to cart" className="bg-blue-600 hover:bg-blue-700" />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
