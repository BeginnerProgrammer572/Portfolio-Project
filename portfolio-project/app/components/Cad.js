import Image from 'next/image';

export default function Cad() {
  return (
    <section id="cad" className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="section-label mb-4">Spec — 005 / CAD</p>
        <h2 className="mb-4 font-display text-3xl font-bold text-paper">CAD Work</h2>
        <p className="mb-10 max-w-2xl text-sm text-slate">
          VEX drivetrain, modeled in Onshape.
        </p>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-sm border border-white/10 bg-paper p-4 lg:col-span-3">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-copper">
              VEX Drivetrain
            </p>
            <div className="relative aspect-video w-full">
              <Image src="/photos/cad-render.jpg" alt="Onshape render of the VEX drivetrain" fill className="object-contain" />
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 lg:col-span-2">
            <Image src="/photos/cad-drawing.jpg" alt="Dimensioned AutoCAD drawing" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
