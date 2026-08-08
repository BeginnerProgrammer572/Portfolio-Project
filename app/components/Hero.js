export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid bg-grid px-6 pb-20 pt-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 001 / Overview</p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-paper sm:text-6xl">
          Bryan Sobalvarro
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          Upcoming high school junior building robots, embedded control
          systems, and software — VEX Robotics competitor, founder of
          Foothill HS's robotics club, and CDE Academy student dual-enrolled
          at Bakersfield College.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-sm bg-trace px-5 py-2.5 font-mono text-sm font-medium uppercase tracking-widest text-blueprint transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-paper"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-copper/50 px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-copper transition-colors hover:bg-copper/10 focus-visible:outline focus-visible:outline-copper"
          >
            Contact
          </a>
        </div>

        <svg viewBox="0 0 700 120" className="mt-16 w-full max-w-2xl" aria-hidden="true">
          <path
            d="M 20 60 L 180 60 L 220 20 L 480 20 L 520 60 L 680 60"
            fill="none"
            stroke="#4FD1C5"
            strokeWidth="2"
            className="trace-line"
          />
          <circle cx="20" cy="60" r="5" fill="#4FD1C5" />
          <circle cx="350" cy="20" r="5" fill="#C97C4A" />
          <circle cx="680" cy="60" r="5" fill="#4FD1C5" />
          <text x="0" y="90" fill="#8B98A5" fontSize="11" fontFamily="'JetBrains Mono', monospace">ROBOTICS</text>
          <text x="300" y="14" fill="#8B98A5" fontSize="11" fontFamily="'JetBrains Mono', monospace">EMBEDDED</text>
          <text x="610" y="90" fill="#8B98A5" fontSize="11" fontFamily="'JetBrains Mono', monospace">SOFTWARE</text>
        </svg>
      </div>
    </section>
  );
}
