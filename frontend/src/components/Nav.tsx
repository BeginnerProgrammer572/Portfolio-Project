import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const SECTIONS = ['hero', 'about', 'skills', 'github', 'cad', 'awards', 'contact'];

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'Projects' },
  { id: 'cad', label: 'CAD' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact', cta: true },
];

export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 80;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={styles.nav}>
      <a href="#hero" className={styles.logo}>
        BS<em>.</em>
      </a>
      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={[link.cta ? styles.cta : '', !link.cta && active === link.id ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
