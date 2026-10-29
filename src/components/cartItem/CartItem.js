"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";

export default function CartItem({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="cartItem">
      <div className="cartProduct">
        <img
          src={product.image}
          alt={product.title}
          className="cartImage"
        />

        <Link href={`/products/details/${product.id}`}>
          {product.title}
        </Link>
      </div>

      <div className="cartQuantity">
        <button
          type="button"
          onClick={() => dispatch(decreaseQuantity(product.id))}
          disabled={product.quantity === 1}
        >
          −
        </button>

        <span>{product.quantity}</span>

        <button
          type="button"
          onClick={() => dispatch(increaseQuantity(product.id))}
        >
          +
        </button>
      </div>

      <p className="cartPrice">
        ${(product.price * product.quantity).toFixed(2)}
      </p>

      <button
        type="button"
        className="cartDelete"
        onClick={() => dispatch(removeFromCart(product.id))}
      >
        წაშლა
      </button>
    </article>
  );
}