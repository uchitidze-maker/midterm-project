import Link from "next/link";

export default function ProductItem({ product }) {
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
    </article>
  );
}