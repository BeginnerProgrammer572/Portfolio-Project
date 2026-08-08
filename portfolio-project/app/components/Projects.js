import Image from 'next/image';

const BUILDING_NEXT = [
  {
    title: 'ESP32 PID Ball Balancer',
    status: 'Planned',
    description: 'Hardware project to learn PID control hands-on — an ultrasonic sensor and servo balancing a ball on a hinged beam, PID math written from scratch.',
  },
  {
    title: 'Coding Curriculum Guide',
    status: 'Idea stage',
    description: 'A VEX IQ + V5 programming guide, blocks through C++, for younger students getting started in robotics.',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 004 / Projects</p>
        <h2 className="mb-10 font-display text-3xl font-bold text-paper">Projects</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="flex flex-col overflow-hidden rounded-sm border border-white/10 transition-colors hover:border-trace/40">
            <div className="relative h-44 w-full">
              <Image src="/photos/vex-robot.jpg" alt="VEX Robotics robot" fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-copper">Robotics — Competition</p>
              <h3 className="mb-2 font-display text-xl font-bold text-paper">VEX Robotics</h3>
              <p className="mb-4 flex-1 text-sm text-slate">
                Competing since 8th grade; founded and run Foothill HS's VEX club as team lead, handling parts procurement and event logistics, and mentoring newer members along the way. Judges Award + Build Award at regionals, qualified to state in 10th grade (competed solo at the qualifying event).
              </p>
              <ul className="flex flex-wrap gap-2">
                {['C++', 'PROS', 'PID', 'Odometry'].map((s) => (
                  <li key={s} className="rounded-sm border border-trace/30 px-2 py-0.5 font-mono text-[11px] text-trace">{s}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="flex flex-col rounded-sm border border-white/10 p-6 transition-colors hover:border-trace/40">
            <div className="mb-2 flex items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-copper">Web App</p>
              <span className="rounded-sm bg-trace/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-trace">
                In progress
              </span>
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-paper">Kern Opportunity Finder</h3>
            <p className="mb-4 flex-1 text-sm text-slate">
              AI-matched web app for scholarships, internships, events, competitions, and clubs across Kern County — built for a regional student tech conference. A collaborative team project where I'm tech lead, handling the majority of the build and mentoring teammates new to web development. Students enter their interests and get a filtered, deadline-sorted list of local opportunities.
            </p>
            <ul className="flex flex-wrap gap-2">
              {['Next.js', 'Supabase', 'Gemini API'].map((s) => (
                <li key={s} className="rounded-sm border border-trace/30 px-2 py-0.5 font-mono text-[11px] text-trace">{s}</li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col rounded-sm border border-white/10 p-6 transition-colors hover:border-trace/40">
            <div className="mb-2 flex items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-copper">Web App</p>
              <span className="rounded-sm bg-copper/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-copper">
                In progress — private
              </span>
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-paper">Almond Project</h3>
            <p className="mb-4 flex-1 text-sm text-slate">
              A parcel/almond filtering and scout-log tool for real field use. Solo-developed. Private client project — details limited until complete.
            </p>
            <ul className="flex flex-wrap gap-2">
              {['Next.js', 'JavaScript', 'Tailwind CSS'].map((s) => (
                <li key={s} className="rounded-sm border border-trace/30 px-2 py-0.5 font-mono text-[11px] text-trace">{s}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10 rounded-sm border border-dashed border-white/20 p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate">What I'm building next</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BUILDING_NEXT.map((p) => (
              <div key={p.title}>
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="font-display font-semibold text-paper">{p.title}</h4>
                  <span className="rounded-sm bg-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate">
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-slate">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
