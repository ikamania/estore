import Authform from "./auth/Authform"
import Inputfield from "./auth/Inputfield.jsx"

const Login = () => {
  const fields = [
    <Inputfield label="Email:" placeholder="Enter your email" type="email" />,
    <Inputfield label="Password:" placeholder="Enter your password" type="text" />,
  ]

  return (
    <section className="w-full h-full flex justify-center">
      <Authform title="Sign in" fields={fields} outTitle='Sign up' outLink='/signup' />
    </section>
  )
}

export default Login
