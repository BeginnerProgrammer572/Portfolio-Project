import Logo from './Logo';

const LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#releases', label: 'Releases' },
  { href: '#contact', label: 'Contact' },
];

export default function RepoHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-mono text-sm">
            <span className="text-muted">bryansobalvarro</span>
            <span className="text-muted"> / </span>
            <span className="font-medium text-ink">portfolio</span>
          </span>
        </a>
        <ul className="hidden gap-5 font-mono text-xs text-muted sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/BeginnerProgrammer572"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-link"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
