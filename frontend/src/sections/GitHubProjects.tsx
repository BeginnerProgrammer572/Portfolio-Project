import { useEffect, useState } from 'react';
import styles from './GitHubProjects.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

const GITHUB_USER = 'BeginnerProgrammer572';

const LANG_COLORS: Record<string, string> = {
  'C++': '#f34b7d',
  C: '#555',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  TypeScript: '#2b7489',
  Rust: '#dea584',
  Shell: '#89e051',
  Arduino: '#bd79d1',
};

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

type State = 'loading' | 'loaded' | 'empty' | 'error';

export default function GitHubProjects() {
  const { ref, inView } = useFadeIn<HTMLDivElement>();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=9`);
        if (!r.ok) throw new Error();
        const data: Repo[] = await r.json();
        if (cancelled) return;
        if (!data.length) {
          setState('empty');
        } else {
          setRepos(data.slice(0, 9));
          setState('loaded');
        }
      } catch {
        if (!cancelled) setState('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className={styles.github}>
      <div ref={ref} className={`wrap fadeUp ${inView ? 'in' : ''}`}>
        <div className={styles.head}>
          <div>
            <div className="tag">Open Source</div>
            <h2 className={`sectionTitle ${styles.headTitle}`}>GitHub Projects</h2>
          </div>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener" className={styles.link}>
            View all on GitHub →
          </a>
        </div>
        <div className={styles.grid}>
          {state === 'loading' && <div className={styles.state}>Loading repositories…</div>}
          {state === 'empty' && <div className={styles.state}>No public repos found yet.</div>}
          {state === 'error' && (
            <div className={styles.state}>
              <p>Couldn't load live repos.</p>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener" className={`${styles.link} ${styles.stateLink}`}>
                View on GitHub →
              </a>
            </div>
          )}
          {state === 'loaded' &&
            repos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className={styles.card}>
                <div className={styles.name}>{repo.name}</div>
                <div className={styles.desc}>{repo.description || 'No description provided.'}</div>
                <div className={styles.meta}>
                  {repo.language && (
                    <span className={styles.langBadge}>
                      <span className={styles.langDot} style={{ background: LANG_COLORS[repo.language] || '#aaa' }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && <span className={styles.stars}>★ {repo.stargazers_count}</span>}
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
