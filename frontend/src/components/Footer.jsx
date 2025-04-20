// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-white text-center text-gray-600 text-sm py-4 border-t mt-10">
      © {new Date().getFullYear()} Exxa Finance · All rights reserved · Testnet Only
    </footer>
  );
}

export default Footer;
