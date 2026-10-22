"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./page.css";

const registrationSchema = yup.object({
  firstName: yup
    .string()
    .required("სახელი აუცილებელია")
    .min(4, "სახელი მინიმუმ 4 სიმბოლო უნდა იყოს")
    .max(20, "სახელი მაქსიმუმ 20 სიმბოლო უნდა იყოს"),

  lastName: yup
    .string()
    .required("გვარი აუცილებელია")
    .min(4, "გვარი მინიმუმ 4 სიმბოლო უნდა იყოს")
    .max(20, "გვარი მაქსიმუმ 20 სიმბოლო უნდა იყოს"),

  age: yup
    .number()
    .typeError("ასაკი რიცხვით უნდა შეიყვანო")
    .required("ასაკი აუცილებელია")
    .min(13, "ასაკი მინიმუმ 13 უნდა იყოს")
    .max(120, "ასაკი მაქსიმუმ 120 უნდა იყოს"),

  email: yup
    .string()
    .required("იმეილი აუცილებელია")
    .email("შეიყვანე სწორი იმეილი"),

  password: yup
    .string()
    .required("პაროლი აუცილებელია")
    .min(6, "პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს")
    .max(12, "პაროლი მაქსიმუმ 12 სიმბოლო უნდა იყოს")
    .matches(/[A-Z]/, "პაროლში უნდა იყოს მინიმუმ ერთი დიდი ლათინური ასო")
    .matches(/[a-z]/, "პაროლში უნდა იყოს მინიმუმ ერთი პატარა ლათინური ასო")
    .matches(/[0-9]/, "პაროლში უნდა იყოს მინიმუმ ერთი ციფრი"),

  phone: yup
    .string()
    .required("ტელეფონი აუცილებელია")
    .matches(
      /^\d{10,100}$/,
      "ტელეფონი უნდა შეიცავდეს მხოლოდ 10-დან 100-მდე ციფრს"
    ),
});

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
  });

  async function onSubmit(formData) {
    setMessage("");
    setSuccess(false);

    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      age: formData.age,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("მონაცემების გაგზავნა ვერ მოხერხდა");
      }

      await response.json();

      setSuccess(true);
      setMessage(
        "ფორმა წარმატებით გაიგზავნა. ეს სატესტო API-ა და მონაცემებს მუდმივად არ ინახავს."
      );
      reset();
    } catch {
      setSuccess(false);
      setMessage("მონაცემების გაგზავნისას შეცდომა მოხდა. სცადე თავიდან.");
    }
  }

  return (
    <main className="registerPage">
      <form
        className="registerForm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1>მომხმარებლის რეგისტრაცია</h1>
        <p className="formIntro">შეავსე ყველა ველი რეგისტრაციისთვის.</p>

        <label htmlFor="firstName">სახელი</label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="მაგალითად, Giorgi"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="fieldError">{errors.firstName.message}</p>
        )}

        <label htmlFor="lastName">გვარი</label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="მაგალითად, Beridze"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="fieldError">{errors.lastName.message}</p>
        )}

        <label htmlFor="age">ასაკი</label>
        <input
          id="age"
          type="number"
          min="13"
          max="120"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <p className="fieldError">{errors.age.message}</p>}

        <label htmlFor="email">იმეილი</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          {...register("email")}
        />
        {errors.email && <p className="fieldError">{errors.email.message}</p>}

        <label htmlFor="password">პაროლი</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="fieldError">{errors.password.message}</p>
        )}

        <label htmlFor="phone">ტელეფონი</label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={100}
          autoComplete="tel"
          placeholder="მხოლოდ ციფრები"
          {...register("phone")}
        />
        {errors.phone && <p className="fieldError">{errors.phone.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "იგზავნება..." : "რეგისტრაცია"}
        </button>

        {message && (
          <p
            className={
              success
                ? "formMessage successMessage"
                : "formMessage errorMessage"
            }
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}