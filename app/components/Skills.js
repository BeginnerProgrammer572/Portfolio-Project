const DEPENDENCIES = [
  ['cpp', 'competitive'],
  ['javascript', 'latest'],
  ['react', '^18'],
  ['next', '^14'],
  ['tailwindcss', '^3'],
];

const DEV_DEPENDENCIES = [
  ['vex-pros', 'latest'],
  ['pid-control', 'tuned'],
  ['esp32', 'learning'],
  ['onshape', 'latest'],
  ['autocad', 'competition-grade'],
];

function ObjectBlock({ label, entries, indent, last }) {
  return (
    <>
      <div>
        <span className="text-link">&quot;{label}&quot;</span>
        <span className="text-muted">: {'{'}</span>
      </div>
      {entries.map(([key, value], i) => (
        <div key={key} style={{ paddingLeft: `${indent + 2}ch` }}>
          <span className="text-link">&quot;{key}&quot;</span>
          <span className="text-muted">: </span>
          <span className="text-diffgreen">&quot;{value}&quot;</span>
          <span className="text-muted">{i < entries.length - 1 ? ',' : ''}</span>
        </div>
      ))}
      <div style={{ paddingLeft: `${indent}ch` }}>
        <span className="text-muted">{'}'}{last ? '' : ','}</span>
      </div>
    </>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-border px-6 py-14">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">package.json</p>
        <pre className="overflow-x-auto rounded-md border border-border bg-panel p-5 font-mono text-sm leading-relaxed text-ink">
          <code>
            <div>{'{'}</div>
            <div style={{ paddingLeft: '2ch' }}>
              <span className="text-link">&quot;name&quot;</span>
              <span className="text-muted">: </span>
              <span className="text-diffgreen">&quot;bryan-sobalvarro&quot;</span>
              <span className="text-muted">,</span>
            </div>
            <div style={{ paddingLeft: '2ch' }}>
              <ObjectBlock label="dependencies" entries={DEPENDENCIES} indent={2} last={false} />
            </div>
            <div style={{ paddingLeft: '2ch' }}>
              <ObjectBlock label="devDependencies" entries={DEV_DEPENDENCIES} indent={2} last />
            </div>
            <div>{'}'}</div>
          </code>
        </pre>
      </div>
    </section>
  );
}
