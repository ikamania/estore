import { Link } from "react-router-dom";

const Authform = ({ title, fields, outTitle, outLink, action }) => {
  return (
    <div className="w-fit h-full flex flex-col items-center md:justify-center gap-2">
      <h1 style={{ fontSize: 'var(--size-large)' }}>{title}</h1>

      {fields}

      <button className="border w-full mt-[1rem]" onClick={action} >Submit</button>

      <Link to={outLink} className="border w-full flex justify-center">
        {outTitle}
      </Link>
    </div>
  )
}

export default Authform
