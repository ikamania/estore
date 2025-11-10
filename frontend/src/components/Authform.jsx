import { Link } from "react-router-dom";

const Authform = ({ title, fields, outTitle, outLink, action }) => {
  return (
    <div className="w-full max-w-sm bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center gap-4">

      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="w-full flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={index} className="w-full">
            {field}
          </div>
        ))}
      </div>

      <button
        className="w-full bg-gray-800 text-white font-semibold p-2 rounded hover:bg-gray-700 transition-colors"
        onClick={action}
      >
        Submit
      </button>

      <Link
        to={outLink}
        className="w-full text-center text-gray-800 border border-gray-200 rounded p-2 hover:bg-gray-100 transition-colors"
      >
        {outTitle}
      </Link>
    </div>
  )
}

export default Authform
