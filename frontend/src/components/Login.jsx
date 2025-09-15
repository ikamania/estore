import Authform from "./auth/Authform"
import Inputfield from "./auth/Inputfield.jsx"

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fields = [
    <Inputfield value={email} onChange={(e) => setEmail(e.target.value)} label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield value={password} onChange={(e) => setPassword(e.target.value)} label="Password:" placeholder="Enter your password" type="text" />,
  ]

  return (
    <section className="w-full h-full flex justify-center">
      <Authform title="Sign in" fields={fields} outTitle='Sign up' outLink='/signup' />
    </section>
  )
}

export default Login
