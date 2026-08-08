import Image from 'next/image';

const AWARDS = [
  { year: '10th grade', title: 'Judges Award + Build Award', detail: 'VEX Robotics regionals; qualified to state' },
  { year: '9th grade', title: 'Judges Award', detail: 'VEX Robotics regionals; quarterfinal finish' },
  { year: '2025', title: 'CSF Induction', detail: 'California Scholarship Federation' },
  { year: '10th grade', title: 'BC AutoCAD Competition', detail: 'Industrial Drawing & Architecture, competed against 10th–12th graders' },
  { year: '9th grade', title: 'Workforce Readiness Certificate', detail: 'Boys & Girls Club of Kern County' },
  { year: '8th grade', title: 'CTEC Certification', detail: 'Entrepreneurial Mindset' },
];

export default function Awards() {
  return (
    <section id="awards" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 006 / Awards</p>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-10 font-display text-3xl font-bold text-paper">Awards & Certifications</h2>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {AWARDS.map((a) => (
                <li key={a.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-32 shrink-0 font-mono text-xs uppercase tracking-widest text-copper">{a.year}</span>
                  <span className="font-display font-semibold text-paper">{a.title}</span>
                  <span className="text-sm text-slate">{a.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/10 lg:block">
            <Image src="/photos/award-build.jpg" alt="VEX Robotics Build Award trophy" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
