// SubscribeSection.jsx
import React, { useState } from "react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email address.");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className=" py-16 px-4 text-center">

      <h2 className="text-3xl lg:text-4xl font-bold mb-3">Never Miss a Deal!</h2>
      <p className="text-gray-500 text-lg mb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form
        onSubmit={handleSubscribe}
        className="max-w-xl mx-auto flex items-center border border-gray-300 rounded-md"
      >
        <input
          type="email"
          placeholder="Enter your email id"
          className="w-full sm:w-2/3 px-4 py-3 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className=" sm:w-1/3 bg-blue-600 text-white px-4 py-3 rounded-r hover:bg-blue-700 transition-all"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default SubscribeSection;
