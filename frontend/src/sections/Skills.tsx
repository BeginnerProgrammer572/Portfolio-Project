import styles from './Skills.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

interface Skill {
  name: string;
  note?: string;
  pct: number;
}

const CATEGORIES: { name: string; skills: Skill[] }[] = [
  {
    name: 'Programming',
    skills: [
      { name: 'C++', pct: 82 },
      { name: 'Python / Web', pct: 50 },
      { name: 'GitHub', pct: 55 },
      { name: 'JavaScript', pct: 55 },
    ],
  },
  {
    name: 'VEX Robotics',
    skills: [
      { name: 'V5', pct: 85 },
      { name: 'PROS', note: '(C++ extension)', pct: 76 },
      { name: 'Autonomous Programming', pct: 78 },
      { name: 'Driver Control', pct: 80 },
    ],
  },
  {
    name: 'CAD & Design',
    skills: [
      { name: 'Fusion 360', pct: 78 },
      { name: 'AutoCAD (.dwg)', pct: 72 },
      { name: 'OnShape', pct: 68 },
    ],
  },
  {
    name: 'Engineering & AI',
    skills: [
      { name: 'Robotics Systems', pct: 80 },
      { name: 'AI / Claude Tools', pct: 62 },
      { name: 'Embedded Systems', pct: 65 },
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useFadeIn<HTMLDivElement>();

  return (
    <section id="skills" className={styles.skills}>
      <div ref={ref} className={`wrap fadeUp ${inView ? 'in' : ''}`}>
        <div className="tag">Expertise</div>
        <h2 className="sectionTitle">Skills &amp; Tools</h2>
        <p className="sub">
          A range spanning competition robotics, mechanical design, embedded programming, and
          modern AI-assisted development.
        </p>
        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className={styles.cat}>
              <div className={styles.catName}>{cat.name}</div>
              {cat.skills.map((skill) => (
                <div key={skill.name} className={styles.row}>
                  <span className={styles.name}>
                    {skill.name}
                    {skill.note && <span className={styles.note}> {skill.note}</span>}
                  </span>
                  <div className={styles.track}>
                    <div className={styles.fill} style={{ width: inView ? `${skill.pct}%` : 0 }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
