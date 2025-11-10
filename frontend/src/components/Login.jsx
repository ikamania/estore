import Authform from "./Authform"
import Inputfield from "./Inputfield.jsx"

import { useAuth } from "../auth/Auth"

import { useState } from "react";

const Login = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fields = [
    <Inputfield key="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield key="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password:" placeholder="Enter your password" type="password" />,
  ]

  const handleLogin = async () => {
    await login(email, password)
  }

  return (
    <section className="w-full h-full flex justify-center items-center bg-white">
      <Authform
        title="Sign in"
        fields={fields}
        outTitle="Sign up"
        outLink="/signup"
        action={handleLogin}
      />
    </section>
  )
}

export default Login
