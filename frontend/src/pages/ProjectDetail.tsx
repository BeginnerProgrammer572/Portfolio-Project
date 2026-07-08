import { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects from '../data/projects.json';
import styles from './ProjectDetail.module.css';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className={styles.page}>
        <p>Project not found. <Link to="/#github">← Back to Projects</Link></p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link to="/#github" className={styles.back}>← Back to Projects</Link>
      <h1>{project.title}</h1>

      <div className={styles.viewer}>
        <Suspense fallback={<div className={styles.loading}>Loading model…</div>}>
          <ModelViewer glbPath={project.model} />
        </Suspense>
      </div>

      <div className={styles.info}>
        <p className={styles.description}>{project.description}</p>

        {project.downloads.length > 0 && (
          <div className={styles.downloads}>
            <h2>Downloads</h2>
            {project.downloads.map((d) => (
              <a key={d.label} href={d.path} download className={styles.downloadBtn}>
                ↓ {d.label}
              </a>
            ))}
          </div>
        )}

        {project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        <p className={styles.meta}>{project.tool} · {project.date}</p>
      </div>
    </main>
  );
}
