const Inputfield = ({ label, placeholder, type }) => {
  return (
    <label className="flex flex-col gap-[.3rem]">
      {label}
      <input type={type} placeholder={placeholder} className="border rounded-[.3rem] p-[.3rem]" />
    </label>
  )
}

export default Inputfield
