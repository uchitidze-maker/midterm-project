"use client";

import { useSelector } from "react-redux";
import CartItem from "@/components/cartItem/CartItem";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "@/redux/cartSlice";

export default function Cart() {
  const products = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartCount);
  const totalPrice = useSelector(selectCartTotal);

  return (
    <section className="cartPage">
      <h1>Shopping Cart</h1>

      {products.length === 0 ? (
        <p className="message">კალათა ცარიელია</p>
      ) : (
        <div className="cartContent">
          <div className="cartHead">
            <p>PRODUCT</p>
            <p>QUANTITY</p>
            <p>PRICE</p>
            <span></span>
          </div>

          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}

          <div className="cartSummary">
            <p>პროდუქტების რაოდენობა: {totalQuantity}</p>
            <p>ჯამური გადასახადი: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </section>
  );
}