import styles from './Contact.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

const EMAIL = '1bryansobalvarro@gmail.com';
const GITHUB_USER = 'BeginnerProgrammer572';

export default function Contact() {
  const { ref, inView } = useFadeIn<HTMLDivElement>();

  return (
    <section id="contact" className={styles.contact}>
      <div className="wrap">
        <div ref={ref} className={`fadeUp ${inView ? 'in' : ''} ${styles.grid}`}>
          <div>
            <div className="tag">Get In Touch</div>
            <h2 className="sectionTitle">Let's connect</h2>
            <p className={styles.intro}>
              Whether you're a recruiter, admissions officer, or fellow builder — I'd love to talk.
            </p>
            <div className={styles.links}>
              <a href={`mailto:${EMAIL}`} className={styles.link}>
                <div className={styles.icon}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className={styles.lbl}>Email</div>
                  <div className={styles.val}>{EMAIL}</div>
                </div>
              </a>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener" className={styles.link}>
                <div className={styles.icon}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className={styles.lbl}>GitHub</div>
                  <div className={styles.val}>{GITHUB_USER}</div>
                </div>
              </a>
            </div>
          </div>
          <div className={styles.panel}>
            <h3>Open to opportunities</h3>
            <p>
              Internships, research positions, robotics competitions, and engineering
              collaborations. I'm actively seeking experiences to grow and contribute.
            </p>
            <a href={`mailto:${EMAIL}`} className={`btn btnPrimary ${styles.panelCta}`}>
              Send a message →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
