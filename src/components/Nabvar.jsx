"use client";
import { Menu, Phone, X } from "react-feather";
import React, { useState } from "react";
import Link from "next/link";
import AppButton from "./UI/AppButton";

const Nabvar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 px-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 backdrop-blur-md sm:px-6 rounded-full border-1 border-lime-950 shadow-md">
        <div className="flex justify-between items-center h-19">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <div className="text-3xl font-bold flex items-center">
                <span className="text-lime-400">R</span>
                <span className="text-white">AHAT</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-lime-400 hover:text-lime-300 md:text-base text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              href="#aboutme"
              className="text-white hover:text-lime-400 md:text-base text-sm font-medium transition"
            >
              About Me
            </Link>
            <Link
              href="#experience"
              className="text-white hover:text-lime-400 md:text-base text-sm font-medium transition"
            >
              Experience
            </Link>
            <Link
              href="#services"
              className="text-white hover:text-lime-400 md:text-base text-sm font-medium transition"
            >
              Services
            </Link>
            <Link
              href="#projects"
              className="text-white hover:text-lime-400 md:text-base text-sm font-medium transition"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-white hover:text-lime-400 md:text-base text-sm font-medium transition"
            >
              Contact Me
            </Link>
          </div>

          {/* Get In Touch Button */}
          <div className="hidden md:block">
            <AppButton
              title="Get In Touch"
              icon={Phone}
              className="bg-lime-400 text-black hover:bg-lime-300"
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <a href="#" className="block text-lime-400 py-2">
              Home
            </a>
            <a href="#" className="block text-white hover:text-lime-400 py-2">
              About Me
            </a>
            <a href="#" className="block text-white hover:text-lime-400 py-2">
              Services
            </a>
            <a href="#" className="block text-white hover:text-lime-400 py-2">
              Projects
            </a>
            <a href="#" className="block text-white hover:text-lime-400 py-2">
              Pages
            </a>
            <a href="#" className="block text-white hover:text-lime-400 py-2">
              Contact Us
            </a>
            <button className="w-full bg-lime-400 text-black px-6 py-3 rounded-full font-semibold mt-4">
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nabvar;
