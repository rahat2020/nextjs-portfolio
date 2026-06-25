import Nabvar from "./Nabvar";
import Hero from "./Hero/Hero";
import AboutMe from "./AboutMe/AboutMe";
import Projects from "./Projects";
import ContactMe from "./Contactme";
import Experience from "./Experience";
import Posts from "./Posts";

const HomePage = () => {
  return (
    <div className="min-h-screen  text-white">
      <Nabvar />
      <Hero />
      <AboutMe />
      <Experience />
      <Projects />
      <Posts />
      <ContactMe />
    </div>
  );
};
export default HomePage;
