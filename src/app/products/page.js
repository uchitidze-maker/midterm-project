"use client";

import { useState, useEffect } from "react";
import ProductItem from "@/components/productItem/ProductItem";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
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

  if (loading) {
    return <p className="message">იტვირთება...</p>;
  }

  if (error) {
    return <p className="message">მოხდა შეცდომა</p>;
  }

  return (
    <div className="productsGrid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}