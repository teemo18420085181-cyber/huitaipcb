import Image from 'next/image';

const IMAGES = [
  {
    src: '/factory/real-smt-1.jpg',
    alt: 'SMT production line for printed circuit board assembly',
    tag: 'SMT ASSEMBLY',
    title: 'Production equipment and line setup',
    span: 'lg:col-span-7 lg:row-span-2',
  },
  {
    src: '/factory/real-aoi-op.jpg',
    alt: 'Operator reviewing assembled boards at an AOI inspection station',
    tag: 'AOI INSPECTION',
    title: 'Operator-led inspection review',
    span: 'lg:col-span-5',
  },
  {
    src: '/factory/real-reels.jpg',
    alt: 'Electronic component reels stored for PCBA assembly projects',
    tag: 'COMPONENT KITTING',
    title: 'Component storage and project kitting',
    span: 'lg:col-span-5',
  },
  {
    src: '/images/china-pcba-manufacturer/pcba-board-batch-real.jpg',
    alt: 'Batch of assembled green PCBA boards ready for inspection',
    tag: 'ASSEMBLED BOARDS',
    title: 'Finished PCBA from a production batch',
    span: 'lg:col-span-6',
  },
  {
    src: '/factory/real-ship-1.jpg',
    alt: 'Finished PCBA boards prepared for anti-static packing and delivery',
    tag: 'PACKING',
    title: 'Finished boards prepared for delivery',
    span: 'lg:col-span-6',
  },
];

export default function FactoryGrid() {
  return (
    <section className="font-body-cc bg-cc-card px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 max-w-[760px]">
          <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
            REAL MANUFACTURING SCENES
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
            Production, inspection, and finished boards—not abstract technology graphics.
          </h2>
          <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-cc-body">
            These project and production photos show the physical work behind SMT assembly,
            component handling, inspection, and finished PCBA delivery.
          </p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {IMAGES.map((image) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden rounded-2xl bg-cc-mist ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={78}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="font-mono-cc mb-1 text-[9px] font-semibold tracking-[0.18em] text-cc-copper-soft">
                  {image.tag}
                </div>
                <div className="text-sm font-semibold leading-tight">{image.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
