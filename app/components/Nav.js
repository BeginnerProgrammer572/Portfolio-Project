import Logo from './Logo';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#cad', label: 'CAD' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-blueprint/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display text-lg font-bold tracking-tight text-paper">
            B. Sobalvarro
          </span>
        </a>
        <ul className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-slate sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-trace focus-visible:text-trace focus-visible:outline-none">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/BeginnerProgrammer572"
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-trace/40 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-trace transition-colors hover:bg-trace/10 focus-visible:outline focus-visible:outline-trace"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
