import Authform from "./auth/Authform"
import Inputfield from "./auth/Inputfield.jsx"

const Signup = () => {
  const fields = [
    <Inputfield label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield label="Username:" placeholder="Enter your username" type="text" />,
    <Inputfield label="Password:" placeholder="Enter your password" type="password" />,
    <Inputfield label="Confirm password:" placeholder="Confirm your password" type="password" />,
  ]

  return (
    <section className="w-full h-full flex justify-center">
      <Authform title="Sign up" fields={fields} outTitle="Sign in" outLink="/login" />
    </section>
  )
}

export default Signup
