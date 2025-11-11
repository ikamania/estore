import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { url, useAuth } from "../auth/Auth"

import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [user, setUser] = useState(null)
  const [isOwner, SetIsOwner] = useState(false)
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
        SetIsOwner(user.id === product.user)
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: err.message,
          timer: t
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
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                {isOwner && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-700 transition cursor-pointer"
                  >
                    Delete Product
                  </button>
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
