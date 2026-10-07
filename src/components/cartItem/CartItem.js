"use client";

import { useState } from "react";
import Link from "next/link";

export default function CartItem({ product, onDelete }) {
  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

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
        <button onClick={decreaseQuantity} disabled={quantity === 1}>
          −
        </button>

        <span>{quantity}</span>

        <button onClick={increaseQuantity} disabled={quantity === 10}>
          +
        </button>
      </div>

      <p className="cartPrice">
        ${(product.price * quantity).toFixed(2)}
      </p>

      <button
        className="cartDelete"
        onClick={() => onDelete(product.id)}
      >
        წაშლა
      </button>
    </article>
  );
}