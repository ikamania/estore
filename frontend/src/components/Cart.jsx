import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { url } from "./auth/Auth"
import Product from "./product/Product"

const Cart = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const productIds = JSON.parse(localStorage.getItem("cart")) || []

    const fetchValidProducts = async () => {
      const fetchPromises = productIds.map(id =>
        fetch(`${url}/products/${id}/`)
          .then(res => {
            if (!res.ok) throw new Error(`Product ${id} not found`)

            return res.json()
          })
          .catch(() => null)
      )

      const results = await Promise.all(fetchPromises)

      const validProducts = results.filter(product => product !== null)

      setProducts(validProducts)
    }

    fetchValidProducts()
  }, [])

  const handlePurchase = () => {
  }

  return (
    <div className="px-[1rem] h-[90%] flex flex-col gap-[1rem] bg-white">
      <div className="w-full flex flex-row justify-between items-center text-2xl font-semibold">
        <h1 className="text-gray-800">My Cart</h1>
      </div>

      <div className="info-box flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="flex justify-between items-center font-bold mb-2">
          <h1 className="text-gray-800 text-lg">Added Products</h1>
          <Link
            to="/"
            className="p-1 cursor-pointer text-red-500 hover:text-red-400 transition-colors"
          >
            Add More
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-3">
          {products.length === 0 ? (
            <p className="text-center w-full text-gray-500">No products uploaded</p>
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

        {products.length > 0 && (
          <button
            onClick={handlePurchase}
            className="w-full py-2 bg-red-500 text-white font-bold rounded hover:bg-red-400 transition-colors"
          >
            Purchase
          </button>
        )}
      </div>
    </div>
  )
}

export default Cart
