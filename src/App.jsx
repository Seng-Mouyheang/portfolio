import React, { useState, useEffect, Suspense } from "react";
import "./i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SKILL_IMAGES } from "./constants/skillImages";
import { SECTION_IDS } from "./constants/sections";

import homeImage from "./assets/home.png";
import moonImage from "./assets/moon.png";
import lightImage from "./assets/light.png";
import self from "./assets/self.jpg";
import gridImage from "./assets/grid.png";
import footerImage from "./assets/footer.png";

import Navigation from "./components/Navigation";
import Home from "./sections/Home";
import About from "./sections/About";
import Project from "./sections/Project";
import Skill from "./sections/Skill";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const current = SECTION_IDS.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="font-sans bg-(--color-bg) text-(--color-text)">
          <Navigation
            activeSection={activeSection}
            isMenuOpen={isMenuOpen}
            isScrolled={isScrolled}
            scrollToSection={scrollToSection}
            setIsMenuOpen={setIsMenuOpen}
          />

          <main className="overflow-x-hidden">
            <Home
              scrollToSection={scrollToSection}
              homeImage={homeImage}
              lightImage={lightImage}
              moonImage={moonImage}
            />

            <About gridImage={gridImage} self={self} />

            <Project />

            <Skill skillImages={SKILL_IMAGES} />

            <Contact />
          </main>

          <Footer footerImage={footerImage} />

          <ScrollToTop isScrolled={isScrolled} scrollToTop={scrollToTop} />
        </div>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
