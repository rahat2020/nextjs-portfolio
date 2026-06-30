import Nabvar from "./Nabvar";
import Hero from "./Hero/Hero";
import AboutMe from "./AboutMe/AboutMe";
import Projects from "./Projects";
import ContactMe from "./Contactme";
import Experience from "./Experience";
import Posts from "./Posts";

const HomePage = ({ about }) => {
  return (
    <div className="min-h-screen  text-white">
      <Nabvar />
      <Hero />
      <AboutMe about={about} />
      <Experience />
      <Projects />
      <Posts />
      <ContactMe about={about} />
    </div>
  );
};
export default HomePage;
