import { Link } from "react-router-dom"

const IconLink = ({ to, Icon }) => {
  return (
    <Link
      to={to}
      className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
    >
      <Icon className="text-gray-700 text-2xl" />
    </Link>
  )
}

export default IconLink
