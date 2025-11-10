import { Link } from "react-router-dom"

const Product = ({ id, image, price, text }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="min-w-[10rem] w-[100%] sm:w-[30%] h-[20rem] p-[.5rem] mb-2 cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-[70%] bg-gray-50 flex items-center justify-center rounded-md">
        <img src={image} alt="image could not be loaded" className="w-full h-full object-contain" />
      </div>

      <p className="text-[1.2rem] mt-2 font-semibold text-gray-800">
        <span className="text-[.8rem] relative -top-1 text-gray-500">GEL</span> {price}
      </p>

      <p className="ml-[.3rem] text-[.9rem] line-clamp-2 overflow-hidden text-gray-600">{text}</p>
    </Link>
  )
}

export default Product
