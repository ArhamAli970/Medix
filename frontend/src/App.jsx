import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Product from './Product/Product'
import  Home from './Home'
import Login from './credentials/Login'
import SignUp from './credentials/SignUp'

import PaymentSuccess from './credentials/PaymentSuccess.jsx'
import Order from './Order.jsx'

import Cart from './Product/Cart'
import Address from './credentials/Address'
import Show from './index/Show.jsx';
import NotFound from './NotFound.jsx'

function App() {
 

  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>} >
        <Route index element={<Show/>}/>
        <Route path='/PaymentSuccess' element={<PaymentSuccess/>}/>
        <Route path='/notFound' element={<NotFound/>} />
        <Route path='/Orders' element={<Order/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/address' element={<Address/>} />
        <Route path='/sign' element={<SignUp/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/product' element={<Product/>} />
      </Route>
    </Routes>

    
    </>
  )
}

export default App
