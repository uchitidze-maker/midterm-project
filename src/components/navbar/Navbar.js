import Link from "next/link";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link href="/products">Products</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}