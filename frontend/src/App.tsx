import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ProjectDetail from './pages/ProjectDetail';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import GitHubProjects from './sections/GitHubProjects';
import Cad from './sections/Cad';
import Awards from './sections/Awards';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GitHubProjects />
      <Cad />
      <Awards />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
