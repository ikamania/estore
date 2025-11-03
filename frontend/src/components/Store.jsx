import Product from './Product.jsx'
import image from '../assets/dogleash.png'

const Store = () => {
  return (
    <div className="w-full h-full p-[1rem] flex-col overflow-y-auto">
      <Product image={image} price={56} text={"GiveBest Portable Electric Space Heater with Therm…"} />
    </div>
  )
}

export default Store
