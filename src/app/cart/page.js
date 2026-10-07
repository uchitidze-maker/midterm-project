"use client";

import { useState, useEffect } from "react";
import CartItem from "@/components/cartItem/CartItem";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=3")
      .then((response) => {
        if (!response.ok) {
          throw new Error("პროდუქტები ვერ ჩაიტვირთა");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  function deleteProduct(id) {
    const remainingProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(remainingProducts);
  }

  if (loading) {
    return <p className="message">იტვირთება...</p>;
  }

  if (error) {
    return <p className="message">მოხდა შეცდომა</p>;
  }

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
            <CartItem
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}