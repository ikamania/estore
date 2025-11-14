import { Link } from "react-router-dom"

const IconLink = ({ to, Icon, children }) => {
  return (
    <Link
      to={to}
      className="relative p-2 rounded hover:bg-gray-100 transition-colors duration-200"
    >
      <Icon className="text-gray-700 text-2xl" />
      {children}
    </Link>
  )
}

export default IconLink
