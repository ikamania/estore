import './App.css'
import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu.jsx'
import Store from './components/Store.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Account from './components/Account.jsx'
import Addproduct from './components/product/AddProduct.jsx'
import ProductPage from './components/product/ProductPage.jsx'

import { AuthProvider } from './components/auth/Auth.jsx'

function App() {
  return (
    <AuthProvider>
      <div className='w-screen h-screen flex flex-col'>
        <Menu />

        <Routes>
          <Route path='/' element={<Store />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/add_product' element={<Addproduct />}></Route>
          <Route path='/product/:id' element={<ProductPage />}></Route>
        </Routes>
      </div>
    </AuthProvider >
  )
}

export default App
