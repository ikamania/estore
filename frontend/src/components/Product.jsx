const Product = ({ image, text, price }) => {
  return (
    <div className="w-full h-[20rem] mb-[1rem] p-[.5rem] cursor-pointer">
      <div className="w-full h-[70%] bg-gray-100 flex justify-center items-center">
        <img src={image} alt="dogleash" className="w-[93%] h-[93%] object-cover"></img>
      </div>

      <p className="text-[1.2rem]">
        <span className="text-[.8rem] relative -top-1">GEL</span> {price}
      </p>

      <p className="ml-[.3rem] text-[.9rem]">{text}</p>
    </div>
  )
}

export default Product
