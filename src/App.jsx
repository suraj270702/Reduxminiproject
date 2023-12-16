import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './app/features/products/Products'
import Cart from './app/features/cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Cart />
      <Products />
    </>
  )
}

export default App
