import Image from 'next/image';

const GROUPS = [
  { label: 'Languages', items: ['C++', 'Python', 'JavaScript'] },
  { label: 'Robotics & Embedded', items: ['VEX PROS', 'PID control', 'ESP32 / Arduino', 'Odometry'] },
  { label: 'Web', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { label: 'CAD & Design', items: ['Onshape', 'Fusion 360', 'AutoCAD'] },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 003 / Skills</p>
        <h2 className="mb-10 font-display text-3xl font-bold text-paper">Skills</h2>

        <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group) => (
            <div key={group.label} className="bg-blueprint p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-copper">
                {group.label}
              </p>
              <ul className="space-y-1.5 text-sm text-paper">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-trace" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-sm border border-white/10">
          <p className="border-b border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-copper">
            PID tuning — VEX autons.cpp
          </p>
          <div className="relative aspect-[16/10] w-full">
            <Image src="/photos/pid-code.jpg" alt="Real PID tuning constants from a VEX autons.cpp file" fill className="object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
