import axios from "axios";

export async function  fetchProducts(amount=1){
    return await axios.get("https://dummyjson.com/products")
}