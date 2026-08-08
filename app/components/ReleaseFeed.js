'use client';

import { useState } from 'react';
import ReleaseEntry from './ReleaseEntry';

const TAGS = ['software', 'robotics', 'cad', 'embedded'];

const RELEASES = [
  {
    kind: 'unreleased',
    tags: ['embedded', 'software'],
    items: [
      {
        title: 'ESP32 PID Ball Balancer',
        status: 'Planned',
        tag: 'embedded',
        description: 'Ultrasonic sensor and servo balancing a ball on a hinged beam. PID math from scratch.',
      },
      {
        title: 'Coding Curriculum Guide',
        status: 'Idea stage',
        tag: 'software',
        description: 'VEX IQ + V5 programming guide, blocks through C++, for students just starting robotics.',
      },
    ],
  },
  {
    kind: 'release',
    version: 'v3.0.0-beta',
    status: 'prerelease',
    hash: '9c1f4e2',
    date: 'Current',
    tags: ['software'],
    title: 'Almond Project',
    description:
      'Field-use tool for almond parcel filtering and scout logs. Solo build, private client work — limited detail until complete.',
  },
  {
    kind: 'release',
    version: 'v2.0.0-beta',
    status: 'prerelease',
    hash: '6d8a3b7',
    date: 'Current',
    tags: ['software'],
    title: 'Kern Opportunity Finder',
    description:
      'Matches Kern County students to scholarships, internships, and events by interest — built for a regional student tech conference. Tech lead on a collaborative team; handled most of the build, mentored teammates new to web dev.',
    link: 'https://github.com/BeginnerProgrammer572/kern-opportunity-finder',
    patches: [{ version: 'v2.0.1', bullets: ['CSF Induction — California Scholarship Federation'] }],
  },
  {
    kind: 'release',
    version: 'v1.1.0',
    status: 'latest',
    hash: 'a3f9c21',
    date: '10th grade',
    tags: ['cad', 'robotics'],
    title: 'Added CAD to the toolchain',
    description: 'Started modeling drivetrains in Onshape, with dimensioned drawings in AutoCAD.',
    images: [
      { src: '/photos/cad-render.jpg', alt: 'Onshape render of the VEX drivetrain', filename: 'cad-render.jpg' },
      { src: '/photos/cad-drawing.jpg', alt: 'Dimensioned AutoCAD drawing', filename: 'cad-drawing.jpg' },
    ],
    patches: [
      {
        version: 'v1.1.1',
        bullets: ['BC AutoCAD Competition — Industrial Drawing & Architecture, placed against 10th–12th graders'],
      },
    ],
  },
  {
    kind: 'release',
    version: 'v1.0.0',
    status: 'shipped',
    hash: '5e2d19f',
    date: '9th grade',
    tags: ['robotics'],
    title: "Founded Foothill HS's VEX club",
    description:
      'Team lead — parts procurement, event logistics, mentoring newer members, and most of the C++ programming: PID control, odometry, autonomous routines.',
    patches: [
      {
        version: 'v1.0.1',
        bullets: [
          'Judges Award — VEX regionals, quarterfinal',
          'Workforce Readiness Certificate — Boys & Girls Club of Kern County',
        ],
      },
      { version: 'v1.0.2', bullets: ['Judges Award + Build Award — VEX regionals, qualified to state'] },
    ],
  },
  {
    kind: 'release',
    version: 'v0.1.0',
    status: 'shipped',
    hash: '1b7c4a0',
    date: '8th grade',
    tags: ['robotics'],
    title: 'Got into robotics',
    description:
      "Joined a month late and was my team's top coder within a week. Block-based code to Python to competitive C++ from there.",
    patches: [{ version: 'v0.1.1', bullets: ['CTEC Certification — Entrepreneurial Mindset'] }],
  },
];

export default function ReleaseFeed() {
  const [filter, setFilter] = useState(null);
  const visible = filter ? RELEASES.filter((r) => r.tags.includes(filter)) : RELEASES;

  return (
    <section id="releases" className="border-b border-border px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <p className="mr-2 font-mono text-xs uppercase tracking-widest text-muted">Releases</p>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`rounded-full border px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-link ${
              filter === null ? 'border-ink text-ink' : 'border-border text-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {TAGS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full border px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-link ${
                filter === t ? 'border-ink text-ink' : 'border-border text-muted hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="relative">
          <div className="absolute bottom-2 left-[3px] top-2 w-px bg-border" aria-hidden="true" />
          {visible.map((entry, i) => (
            <ReleaseEntry
              key={entry.kind === 'unreleased' ? 'unreleased' : entry.version}
              entry={entry}
              isLast={i === visible.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
