import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <p className="font-mono text-xs text-slate">© {new Date().getFullYear()} Bryan Sobalvarro</p>
        </div>
        <a href="https://github.com/BeginnerProgrammer572" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-widest text-trace hover:underline">
          github.com/BeginnerProgrammer572
        </a>
      </div>
    </footer>
  );
}
