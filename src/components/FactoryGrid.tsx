import Image from 'next/image';

const IMAGES = [
  {
    src: '/factory/real-smt-1.jpg',
    alt: 'SMT production lines',
    tag: 'SMT ASSEMBLY',
    title: 'Multiple SMT lines running simultaneously',
    span: 'lg:col-span-7 lg:row-span-2',
  },
  {
    src: '/factory/real-aoi-op.jpg',
    alt: 'AOI inspection operator',
    tag: 'AOI INSPECTION',
    title: 'Operator monitoring automated optical inspection',
    span: 'lg:col-span-5',
  },
  {
    src: '/factory/real-reels.jpg',
    alt: 'Component reel warehouse',
    tag: 'COMPONENT STOCK',
    title: 'Managed component storage and kitting',
    span: 'lg:col-span-5',
  },
  {
    src: '/factory/real-aoi-line.jpg',
    alt: 'Reflow and AOI line',
    tag: 'REFLOW + AOI',
    title: 'Inline reflow oven and AOI station',
    span: 'lg:col-span-4',
  },
  {
    src: '/factory/real-smt-2.jpg',
    alt: 'Pick and place machines',
    tag: 'PICK & PLACE',
    title: 'High-speed pick-and-place machines',
    span: 'lg:col-span-4',
  },
  {
    src: '/factory/real-ship-1.jpg',
    alt: 'Packed orders ready to ship',
    tag: 'SHIPPING',
    title: 'Orders packed and ready for worldwide delivery',
    span: 'lg:col-span-4',
  },
];

export default function FactoryGrid() {
  return (
    <section className="py-[90px] px-[5vw]">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12 max-w-[680px]">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3.5">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            INSIDE OUR MANUFACTURING NETWORK
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-brand-primary tracking-tight leading-tight mb-3.5">
            Real process.{' '}
            <em className="not-italic text-brand-green-dark">Trained operators.</em>{' '}
            Real boards shipping every day.
          </h2>
          <p className="text-[15px] text-ink-muted leading-relaxed">
            Our team coordinates SMT assembly, component kitting, AOI/X-Ray inspection, and functional testing through our Shenzhen engineering and manufacturing partners.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 auto-rows-[180px]">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-[14px] overflow-hidden bg-brand-primary-light transition-all duration-300 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute left-0 right-0 bottom-0 p-5 text-white"
                style={{
                  background:
                    'linear-gradient(to top, rgba(26,22,64,.92) 0%, transparent 100%)',
                }}
              >
                <div className="text-[9px] tracking-[0.16em] font-semibold text-brand-yellow mb-1">
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
