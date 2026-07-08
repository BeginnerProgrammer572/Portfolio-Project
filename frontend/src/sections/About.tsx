import styles from './About.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

const HIGHLIGHTS = [
  {
    title: 'Robotics Club & Class Founder',
    desc: 'Built the program from the ground up — hardware, software, and full curriculum.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
        <path d="M16 3l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: 'CAD Designer',
    desc: 'Proficient in Fusion 360 & AutoCAD for mechanical design and prototyping.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Programmer',
    desc: 'Building embedded systems, robotics firmware, and algorithms — currently expanding from C++ into new languages.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'AI & Web Development',
    desc: 'Leveraging GitHub, Claude, and modern AI tools for rapid development.',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93A10 10 0 1 0 20 12" />
        <line x1="20" y1="4" x2="20" y2="12" />
        <line x1="12" y1="12" x2="20" y2="12" />
      </svg>
    ),
  },
];

export default function About() {
  const { ref, inView } = useFadeIn<HTMLDivElement>();

  return (
    <section id="about" className={styles.about}>
      <div className="wrap">
        <div ref={ref} className={`fadeUp ${inView ? 'in' : ''} ${styles.grid}`}>
          <div className={styles.body}>
            <div className="tag">About Me</div>
            <h2 className="sectionTitle">Engineering ideas from code to physical form</h2>
            <p>
              I'm Bryan Sobalvarro — a robotics enthusiast, programmer, and CAD designer
              passionate about building systems that actually work. From writing firmware in
              C++ to designing mechanical components in Fusion 360 and AutoCAD, I bridge the
              gap between software and hardware.
            </p>
            <p>
              I founded my school's Robotics Club and Class from scratch — which gave me
              experience not just in engineering, but in leadership, curriculum design, and
              mentoring other students to build confidently.
            </p>
            <p>
              I'm actively exploring AI-assisted development, using tools like Claude and
              GitHub to push what's possible. My goal is to study engineering and keep
              creating — whether that's a robot, a piece of software, or a well-designed
              system.
            </p>
          </div>
          <div className={styles.highlights}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className={styles.card}>
                <div className={styles.icon}>{h.icon}</div>
                <div>
                  <div className={styles.title}>{h.title}</div>
                  <div className={styles.desc}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
