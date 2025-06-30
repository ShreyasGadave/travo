// Testimonials.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

// Sample images (you can import your own or use URLs)
import Emma from "../assets/emma.png";
import John from "../assets/john.png";
import Ava from "../assets/ava.png";

const testimonials = [
  {
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    image: Emma,
    review:
      "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    stars: 5,
  },
  {
    name: "John Smith",
    location: "New York, USA",
    image: John,
    review:
      "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    stars: 5,
  },
  {
    name: "Ava Johnson",
    location: "Sydney, Australia",
    image: Ava,
    review:
      "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold mb-2">What Our Customers Say</h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-10">
        Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md text-left"
          >
            <div className="flex items-center mb-4 gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-gray-400">{testimonial.location}</p>
              </div>
            </div>

            <div className="flex text-blue-600 mb-2">
              {[...Array(testimonial.stars)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-600 text-sm">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
