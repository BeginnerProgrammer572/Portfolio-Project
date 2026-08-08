import Image from 'next/image';

const TAG_STYLES = {
  software: 'text-link bg-link/10',
  robotics: 'text-tagrobotics bg-tagrobotics/10',
  cad: 'text-tagcad bg-tagcad/10',
  embedded: 'text-tagembedded bg-tagembedded/10',
};

const DOT_STYLES = {
  latest: 'bg-diffgreen',
  prerelease: 'bg-link',
  shipped: 'bg-muted',
  unreleased: 'border-2 border-muted bg-canvas',
};

function TagBadge({ tag }) {
  return (
    <span className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${TAG_STYLES[tag]}`}>{tag}</span>
  );
}

function StatusBadge({ status }) {
  if (status === 'latest') {
    return (
      <span className="rounded-full bg-diffgreen/10 px-2 py-0.5 font-mono text-[11px] text-diffgreen">
        Latest
      </span>
    );
  }
  if (status === 'prerelease') {
    return (
      <span className="rounded-full bg-link/10 px-2 py-0.5 font-mono text-[11px] text-link">
        Pre-release
      </span>
    );
  }
  return null;
}

export default function ReleaseEntry({ entry, isLast }) {
  const { kind, version, status, hash, date, tags, title, description, link, patches, images, items } = entry;
  const dotClass = kind === 'unreleased' ? DOT_STYLES.unreleased : DOT_STYLES[status];

  return (
    <li className={`relative pl-8 ${isLast ? '' : 'pb-10'}`}>
      <span className={`absolute left-0 top-1 z-10 h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden="true" />

      {kind === 'unreleased' ? (
        <div>
          <p className="mb-2 font-mono text-sm font-medium text-muted">UNRELEASED</p>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.title} className="rounded-md border border-border bg-panel p-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-sm text-diffgreen">+ {item.title}</span>
                  <span className="font-mono text-[11px] uppercase text-muted">{item.status}</span>
                  <TagBadge tag={item.tag} />
                </div>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-ink">{version}</span>
            <StatusBadge status={status} />
            {tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
            <span className="ml-auto font-mono text-xs text-muted">
              {hash} · {date}
            </span>
          </div>
          <h3 className="mb-1 font-medium text-ink">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
          {link && (
            <p className="mt-1.5">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-link hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
              >
                View repo →<span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
          )}

          {images && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {images.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-md border border-border">
                  <p className="border-b border-border bg-panel px-3 py-1.5 font-mono text-[11px] text-muted">
                    {img.filename}
                  </p>
                  <div className="relative aspect-[4/3] w-full bg-panel">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </figure>
              ))}
            </div>
          )}

          {patches?.map((patch) => (
            <div key={patch.version} className="mt-3 border-l-2 border-border pl-3">
              <p className="font-mono text-xs text-muted">{patch.version}</p>
              <ul className="mt-1 space-y-1">
                {patch.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded bg-diffgreenbg/60 px-2 py-1 font-mono text-xs text-diffgreen"
                  >
                    + {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
