"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required("მომხმარებლის სახელი აუცილებელია"),
  password: yup.string().required("პაროლი აუცილებელია"),
  rememberMe: yup.boolean(),
});

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsLoggedIn(true);
      setMessage("ავტორიზაცია ავტომატურად გაიარა.");
    }

    setCheckingToken(false);
  }, []);

  async function onSubmit(formData) {
    setMessage("");

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("მომხმარებლის სახელი ან პაროლი არასწორია");
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("ტოკენი ვერ მივიღეთ");
      }

      if (formData.rememberMe) {
        localStorage.setItem("authToken", data.token);
      } else {
        localStorage.removeItem("authToken");
      }

      setIsLoggedIn(true);
      setMessage("ავტორიზაცია წარმატებით გაიარა.");
    } catch (error) {
      setIsLoggedIn(false);
      setMessage(error.message || "ავტორიზაციისას შეცდომა მოხდა.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setMessage("სისტემიდან გამოხვედი.");
  }

  if (checkingToken) {
    return <p className="message">იტვირთება...</p>;
  }

  if (isLoggedIn) {
    return (
      <main className="loginPage">
        <h1>ავტორიზაცია</h1>
        <p>{message}</p>
        <button type="button" onClick={handleLogout}>
          გამოსვლა
        </button>
      </main>
    );
  }

  return (
    <main className="loginPage">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>ავტორიზაცია</h1>

        <label htmlFor="username">მომხმარებლის სახელი</label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="password">პაროლი</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label>
          <input type="checkbox" {...register("rememberMe")} />
          დამიმახსოვრე
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "მოწმდება..." : "შესვლა"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}