import Image from 'next/image';

const IMAGES = [
  {
    src: '/factory/real-smt-1.jpg',
    alt: 'SMT assembly production lines for turnkey PCBA manufacturing',
    tag: 'SMT ASSEMBLY',
    title: 'Multiple SMT lines running simultaneously',
    span: 'lg:col-span-7 lg:row-span-2',
  },
  {
    src: '/factory/real-aoi-op.jpg',
    alt: 'Operator running AOI inspection on assembled PCBA boards',
    tag: 'AOI INSPECTION',
    title: 'Operator monitoring automated optical inspection',
    span: 'lg:col-span-5',
  },
  {
    src: '/factory/real-reels.jpg',
    alt: 'Component reel storage for PCB assembly BOM sourcing',
    tag: 'COMPONENT STOCK',
    title: 'Managed component storage and kitting',
    span: 'lg:col-span-5',
  },
  {
    src: '/factory/real-aoi-line.jpg',
    alt: 'Inline reflow oven and AOI station for SMT assembly',
    tag: 'REFLOW + AOI',
    title: 'Inline reflow oven and AOI station',
    span: 'lg:col-span-4',
  },
  {
    src: '/factory/real-smt-2.jpg',
    alt: 'High-speed pick-and-place machines for SMT PCBA assembly',
    tag: 'PICK & PLACE',
    title: 'High-speed pick-and-place machines',
    span: 'lg:col-span-4',
  },
  {
    src: '/factory/real-ship-1.jpg',
    alt: 'Finished PCBA boards packed and ready for worldwide shipping',
    tag: 'SHIPPING',
    title: 'Orders packed and ready for worldwide delivery',
    span: 'lg:col-span-4',
  },
];

export default function FactoryGrid() {
  return (
    <section className="font-body-cc px-[5vw] py-[90px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 max-w-[680px]">
          <div className="font-mono-cc mb-3.5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-soft">
            <span className="h-px w-[18px] bg-cc-copper" />
            INSIDE OUR MANUFACTURING NETWORK
          </div>
          <h2 className="font-display mb-3.5 text-3xl font-bold leading-tight tracking-tight text-cc-ink md:text-4xl lg:text-[44px]">
            Real process. <span className="cc-copper-text">Trained operators.</span> Real boards
            shipping every day.
          </h2>
          <p className="text-[15px] leading-relaxed text-cc-ink-mute">
            Our team coordinates SMT assembly, component kitting, AOI/X-Ray inspection, and
            functional testing through our Shenzhen engineering and manufacturing partners.
          </p>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3.5 lg:grid-cols-12">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-[14px] border border-cc-line bg-cc-carbon-3 transition-all duration-300 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-5 text-cc-ink"
                style={{ background: 'linear-gradient(to top, rgba(10,11,13,.94) 0%, transparent 100%)' }}
              >
                <div className="font-mono-cc mb-1 text-[9px] font-semibold tracking-[0.18em] text-cc-copper-soft">
                  {img.tag}
                </div>
                <div className="text-sm font-semibold leading-tight">{img.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
