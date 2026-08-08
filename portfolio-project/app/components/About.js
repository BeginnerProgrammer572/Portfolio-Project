import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 002 / About</p>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-6 font-display text-3xl font-bold text-paper">About</h2>
            <div className="space-y-4 text-slate">
              <p>
                I'm an upcoming junior at Foothill High School in Bakersfield,
                CA, in the CDE (Computer Design and Engineering) Academy
                pathway and dual-enrolled at Bakersfield College. I got into
                robotics a month late in 8th grade and became my team's top
                coder within a week — since then I've moved from
                block-based code to Python to competitive C++, and I've
                handled everything from funding and parts procurement to
                strategy and solo programming for my team.
              </p>
              <p>
                I'm interested in computer science with a focus on AI and
                entrepreneurship, and I'm building toward a Computer
                Science / Industrial Automation path aimed at California
                universities. Outside of robotics, I'm working on embedded
                systems (PID control on an ESP32) and web development
                (Next.js), and I mentor through BC VEX U and the CSUB
                Software Engineering Club. I've also taught VEX programming
                to kids at a CSUB summer camp and led programming
                instruction for the Bakersfield Robotics nonprofit's summer
                week — introducing the next group of students to robotics
                the way I got introduced to it myself.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 lg:col-span-2 lg:self-center">
            <Image src="/photos/drivetrain-detail.jpg" alt="VEX drivetrain build detail" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
