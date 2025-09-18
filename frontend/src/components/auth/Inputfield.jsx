const Inputfield = ({ label, placeholder, type, value, onChange }) => {
  return (
    <label className="flex flex-col gap-[.3rem]">
      {label}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="border rounded-[.3rem] p-[.3rem]" />
    </label>
  )
}

export default Inputfield
