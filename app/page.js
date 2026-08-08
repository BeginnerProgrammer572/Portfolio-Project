import RepoHeader from './components/RepoHeader';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ReleaseFeed from './components/ReleaseFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <RepoHeader />
      <main>
        <Hero />
        <Skills />
        <ReleaseFeed />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
