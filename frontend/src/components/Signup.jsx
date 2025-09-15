import Authform from "./auth/Authform"
import Inputfield from "./auth/Inputfield.jsx"

import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password0, setPassword0] = useState('')
  const [password1, setPassword1] = useState('')

  const fields = [
    <Inputfield value={email} onChange={(e) => setEmail(e.target.value)} label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield value={username} onChange={(e) => setUsername(e.target.value)} label="Username:" placeholder="Enter your username" type="text" />,
    <Inputfield value={password0} onChange={(e) => setPassword0(e.target.value)} label="Password:" placeholder="Enter your password" type="password" />,
    <Inputfield value={password1} onChange={(e) => setPassword1(e.target.value)} label="Confirm password:" placeholder="Confirm your password" type="password" />,
  ]

  return (
    <section className="w-full h-full flex justify-center">
      <Authform title="Sign up" fields={fields} outTitle="Sign in" outLink="/login" />
    </section>
  )
}

export default Signup
