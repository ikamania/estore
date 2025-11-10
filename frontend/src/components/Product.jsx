const Product = ({ image, text, price }) => {
  return (
    <div className="w-[100%] min-w-[10rem] sm:w-[30%] md:w-[20%] h-[20rem] p-[.5rem] cursor-pointer">
      <div className="w-full h-[70%] bg-gray-100">
        <img src={image} alt="image could not be loaded" className="w-[100%] h-[100%] object-contain"></img>
      </div>

      <p className="text-[1.2rem]">
        <span className="text-[.8rem] relative -top-1">GEL</span> {price}
      </p>

      <p className="ml-[.3rem] text-[.9rem]">{text}</p>
    </div>
  )
}

export default Product
