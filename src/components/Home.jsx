"use client";
import Nabvar from "./Nabvar";
import Hero from "./Hero/Hero";
import AboutMe from "./AboutMe/AboutMe";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 text-white">
      {/* <div className="min-h-screen backgroundcolor !bg-black text-white"> */}
      <Nabvar />
      <Hero />
      <AboutMe />
    </div>
  );
}
