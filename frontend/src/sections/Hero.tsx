import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.pill}>
          <span />
          Open to opportunities
        </div>
        <h1 className={styles.name}>
          Bryan
          <br />
          Sobalvarro<em>.</em>
        </h1>
        <p className={styles.desc}>
          Robotics Club &amp; Class founder, programmer, and CAD designer. I build
          real-world engineering solutions — from firmware to physical form.
        </p>
        <div className={styles.btns}>
          <a href="#github" className="btn btnPrimary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Projects
          </a>
          <a href="#contact" className="btn btnOutline">
            Get In Touch →
          </a>
        </div>
        <div className={styles.stats}>
          <div>
            <div className={styles.statN}>3+</div>
            <div className={styles.statL}>Years Coding</div>
          </div>
          <div>
            <div className={styles.statN}>2</div>
            <div className={styles.statL}>CAD Platforms</div>
          </div>
          <div>
            <div className={styles.statN}>1</div>
            <div className={styles.statL}>Club Founded</div>
          </div>
        </div>
      </div>
    </section>
  );
}
