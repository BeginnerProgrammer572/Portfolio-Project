import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Bryan Sobalvarro</p>
        </div>
        <a
          href="https://github.com/BeginnerProgrammer572"
          target="_blank"
          rel="noreferrer"
          className="rounded-sm font-mono text-xs text-link hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
        >
          github.com/BeginnerProgrammer572<span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </footer>
  );
}
