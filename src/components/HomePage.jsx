"use client";
import Nabvar from "./Nabvar";
import Hero from "./Hero/Hero";
import AboutMe from "./AboutMe/AboutMe";
import Projects from "./Projects";
import ContactMe from "./Contactme";
import Experience from "./Experience";
import Blog from "./Blog";

const HomePage = () => {
  return (
    <div className="min-h-screen  text-white">
      {/* <div className="min-h-screen backgroundcolor !bg-black text-white"> */}
      <Nabvar />
      <Hero />
      <AboutMe />
      <Experience />
      <Projects />
      <Blog />
      <ContactMe />
    </div>
  );
};
export default HomePage;
