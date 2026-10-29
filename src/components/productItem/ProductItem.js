"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <article className="productCard">
      <Link href={`/products/details/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="productImage"
        />

        <h2 className="productTitle">{product.title}</h2>
      </Link>

      <p className="productRating">
        ★ {product.rating.rate} ({product.rating.count})
      </p>

      <p className="productPrice">${product.price}</p>

      <button
        type="button"
        className="addToCartButton"
        onClick={handleAddToCart}
      >
        კალათაში დამატება
      </button>
    </article>
  );
}