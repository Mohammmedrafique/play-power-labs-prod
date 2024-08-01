// Footer.js
import React from "react";
import { GithubIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-2">
          <a
            href="https://github.com/Mohammmedrafique"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href="mailto:kota.mohdrafiq@gmail.com"
            className="text-white hover:text-gray-400"
          >
            <MailIcon size={24} />
          </a>
        </div>
        <p className="text-sm mb-2">Made by Rafiq Pathan</p>
        <p className="text-sm">
          <a
            href="tel:+919829740688"
            className="text-white hover:text-gray-400"
          >
            +919829740688
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
