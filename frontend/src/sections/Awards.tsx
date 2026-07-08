import styles from './Awards.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

const AWARDS = [
  {
    title: 'Robotics Club & Class Founder',
    desc: 'Established the robotics program at my school — sourced equipment, wrote curriculum, and mentored students in hardware and software integration.',
    tag: 'School Achievement',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: 'C++ Robotics Programming',
    desc: 'Developed firmware and control systems for robotics platforms using C++, including motor control, sensor integration, and autonomous behavior.',
    tag: 'Programming',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'CAD Engineering Design',
    desc: 'Designed functional mechanical parts for robotics builds using Fusion 360 and AutoCAD, iterating through prototypes to production-ready components.',
    tag: 'Engineering Design',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Web Development',
    desc: 'Built this portfolio and other projects using AI tools (Claude, GitHub Copilot), demonstrating the ability to ship professional-grade work through modern tooling.',
    tag: 'Innovation',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93A10 10 0 1 0 20 12" />
        <line x1="20" y1="4" x2="20" y2="12" />
        <line x1="12" y1="12" x2="20" y2="12" />
      </svg>
    ),
  },
];

export default function Awards() {
  const { ref, inView } = useFadeIn<HTMLDivElement>();

  return (
    <section id="awards" className={styles.awards}>
      <div ref={ref} className={`wrap fadeUp ${inView ? 'in' : ''}`}>
        <div className="tag">Recognition</div>
        <h2 className="sectionTitle">Awards &amp; Achievements</h2>
        <p className="sub">Highlights from my engineering and academic journey so far.</p>
        <div className={styles.grid}>
          {AWARDS.map((a) => (
            <div key={a.title} className={styles.card}>
              <div className={styles.icon}>{a.icon}</div>
              <div>
                <div className={styles.title}>{a.title}</div>
                <div className={styles.desc}>{a.desc}</div>
                <div className={styles.year}>{a.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
