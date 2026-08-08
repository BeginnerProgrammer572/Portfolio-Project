import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Cad from './components/Cad';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Cad />
      <Awards />
      <Contact />
      <Footer />
    </>
  );
}
