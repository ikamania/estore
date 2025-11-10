import Authform from "./Authform"
import Inputfield from "./Inputfield.jsx"

import { useAuth } from "../auth/Auth"

import { useState } from "react";

const Signup = () => {
  const { signup } = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password0, setPassword0] = useState('')
  const [password1, setPassword1] = useState('')

  const fields = [
    <Inputfield key="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield key="username" value={username} onChange={(e) => setUsername(e.target.value)} label="Username:" placeholder="Enter your username" type="text" />,
    <Inputfield key="password0" value={password0} onChange={(e) => setPassword0(e.target.value)} label="Password:" placeholder="Enter your password" type="password" />,
    <Inputfield key="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} label="Confirm password:" placeholder="Confirm your password" type="password" />,
  ]

  const handleSignup = async () => {
    await signup(email, username, password0, password1)
  }

  return (
    <section className="w-full h-full flex justify-center items-center bg-white">
      <Authform
        title="Sign up"
        fields={fields}
        outTitle="Sign in"
        outLink="/login"
        action={handleSignup}
      />
    </section>
  )
}

export default Signup
