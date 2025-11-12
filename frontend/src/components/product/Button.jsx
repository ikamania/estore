const Button = ({ onClick, text, className }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-semibold py-2 px-4 rounded-xl transition cursor-pointer ${className || ""}`}
    >
      {text}
    </button>
  )
}

export default Button
