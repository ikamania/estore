import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import Product from "./Product"
import { url } from "../auth/Auth"

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

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
          timer: t
        })
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <h1>Loading</h1>
  }

  return (
    <></>
  )
}

export default ProductPage
