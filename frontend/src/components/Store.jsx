import { useState, useEffect } from "react"
import Product from "./Product"
import { url, useAuth } from "../auth/Auth"

const Store = () => {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${url}/products/`)

        if (!response.ok) {
          setLoading(false)
          return
        }

        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [token])

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>
  }
  return (
    <div className="flex flex-wrap justify-around p-2">
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        products.map(prod => {
          return (
            <Product
              id={prod.id}
              key={prod.id}
              image={prod.image}
              price={`${prod.price}`}
              text={prod.description}
            />
          )
        })
      )}
    </div>
  )
}

export default Store
