import React, { useEffect } from 'react'
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItemsAsync, fetchCartItemsAsync, updateCartItemsAsync } from './cartSlice'
import Loader from '../../../../Loader'

const Cart = () => {
  const cartItems = useSelector((state)=>state.cart.cartData)
  const loading = useSelector((state)=>state.cart.isLoading)
  let total = cartItems.reduce((acc,i)=>acc+i.price*parseInt(i.quantity),0)
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(fetchCartItemsAsync())
  },[])

  const handleChange = (e,item) =>{

    console.log(e.target.value)
    dispatch(updateCartItemsAsync({id:item.id,qty:{...item,quantity:e.target.value}}))

  }

  return (
    <>
    <h1>Shopping Cart</h1>

<div class="shopping-cart">

  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">Price</label>
    <label class="product-quantity">Quantity</label>
    <label class="product-removal">Remove</label>
    <label class="product-line-price">Total</label>
  </div>

  {
    loading ? <Loader /> : (
      cartItems.map((item,i)=>(
        <div class="product" key={item.id}>
    <div class="product-image">
      <img src={item.images[0]} />
    </div>
    <div class="product-details">
      <div class="product-title">{item.title}</div>
      
    </div>
    <div class="product-price">{item.price}</div>
    <div class="product-quantity">
      <select value={item.quantity} onChange={(e)=>handleChange(e,item)}>

        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>

      </select>
    </div>
    <div class="product-removal">
      <button class="remove-product" onClick={()=>dispatch(deleteCartItemsAsync(item.id))}>
        Remove
      </button>
    </div>
    <div class="product-line-price">{item.price * parseInt(item.quantity)}</div>
  </div>
      ))
    )
  }

  

  <div class="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">{total}</div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">{total*0.03}</div>
    </div>
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">{total+Math.floor(total*0.03)+15}</div>
    </div>
  </div>
      
      <button class="checkout">Checkout</button>

</div>
    </>
  )
}

export default Cart