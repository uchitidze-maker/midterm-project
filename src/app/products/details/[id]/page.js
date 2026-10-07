"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("პროდუქტი ვერ ჩაიტვირთა");
        }

        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("პროდუქტი ვერ მოიძებნა");
        }

        setProduct(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  if (error) {
    return <p className="message">მოხდა შეცდომა</p>;
  }

  if (product === null) {
    return <p className="message">იტვირთება...</p>;
  }

  return (
    <div className="productDetails">
      <img
        src={product.image}
        alt={product.title}
        className="detailsImage"
      />

      <div className="detailsInfo">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>ფასი: ${product.price}</p>
        <p>კატეგორია: {product.category}</p>
        <p>რეიტინგი: {product.rating.rate}</p>
        <p>შეფასებების რაოდენობა: {product.rating.count}</p>

        <Link href="/products">← პროდუქტებზე დაბრუნება</Link>
      </div>
    </div>
  );
}