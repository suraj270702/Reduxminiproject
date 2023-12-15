import React, { useEffect } from "react";
import { fetchAsync } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCartItemsAsync } from "../cart/cartSlice";

const Products = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(fetchAsync())
    },[])
    const products = useSelector((state)=>state.products.productsData.products)
    console.log(products)
  return (
    <>
      <div className="grid-custom">

      {
        products && (
            products.map((item,i)=>(
                <div className="card" key={i}>
        <img
          src={item.images[0]}
          alt="Avatar"
          className="custom-img"
        />
        <div className="container">
          <h4>
            <b>{item.title}</b>

          </h4>
          <p>{item.description}</p>
          <button className="btn" onClick={()=>dispatch(addCartItemsAsync(item))}>Add to Cart</button>
        </div>
      </div>
            ))
        )
      }
      

      </div>
    </>
  );
};

export default Products;
