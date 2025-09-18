import './App.css'
import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { AuthProvider } from './auth/Auth.jsx'

function App() {
  return (
    <AuthProvider>
      <div className='w-screen h-screen flex flex-col'>
        <Menu />

        <div className='flex-1'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </div>

      </div>
    </AuthProvider>
  )
}

export default App
