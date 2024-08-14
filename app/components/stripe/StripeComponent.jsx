"use client";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./stripe.css";
import { useSelector } from "react-redux";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function App({ premium, clientSecret }) {
  const { user } = useSelector((state) => state.auth);

  // React.useEffect(() => {
  //   if (user) {
  //     // Create PaymentIntent as soon as the page loads
  //     fetch(process.env.NEXT_PUBLIC_BASE_URL + "/subscription/new", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         priceId: premium === "true" ? "yearly" : "monthly",
  //         user: {
  //           name: {
  //             first: user?.data?.name?.first,
  //             last: user?.data?.name?.last,
  //           },
  //           email: user?.data?.email,
  //           // password: data.password,
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret));
  //   }
  // }, [user]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#78ffb6",
      colorText: "#3031d",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
