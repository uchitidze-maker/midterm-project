export default async function Profile() {
  let user = null;

  try {
    const response = await fetch("https://fakestoreapi.com/users/3", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("პროფილი ვერ ჩაიტვირთა");
    }

    user = await response.json();
  } catch {
    return <p className="message">მოხდა შეცდომა</p>;
  }

  if (!user) {
    return <p className="message">პროფილი ვერ მოიძებნა</p>;
  }

  return (
    <section className="profileCard">
      <h1>პროფილი</h1>

      <p>
        სახელი და გვარი: {user.name.firstname} {user.name.lastname}
      </p>
      <p>მომხმარებლის სახელი: {user.username}</p>
      <p>ელფოსტა: {user.email}</p>
      <p>ტელეფონი: {user.phone}</p>
      <p>ქალაქი: {user.address.city}</p>
      <p>
        მისამართი: {user.address.street}, {user.address.number}
      </p>
    </section>
  );
}