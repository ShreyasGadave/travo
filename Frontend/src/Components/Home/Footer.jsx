import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import travo from "../../assets/travo.svg";

const Footer = () => {
  return (
    <footer className=" px-4 py-12 text-gray-600 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
           <img src={travo} alt="" />
          </div>
          <p className="mt-3 text-gray-500">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaEnvelope className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            QUICK LINKS
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Browse Cars</a></li>
            <li><a href="#" className="hover:underline">List Your Car</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            RESOURCES
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Insurance</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">CONTACT</h3>
          <ul className="space-y-2 text-gray-500">
            <li>1234 Luxury Drive</li>
            <li>San Francisco, CA 94107</li>
            <li>+1 234 567890</li>
            <li>info@example.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-10 border-t pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <p>© 2025 Brand. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>|</span>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
