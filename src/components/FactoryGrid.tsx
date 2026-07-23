import Image from 'next/image';

const IMAGES = [
  {
    src: '/images/homepage/manufacturing/smt-assembly-line.webp',
    alt: 'Operators working beside an SMT placement line for PCBA assembly',
    width: 1272,
    height: 494,
    tag: 'SMT ASSEMBLY',
    title: 'SMT placement and line operation',
    span: 'lg:col-span-7 lg:row-span-2',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 57vw',
    position: 'object-center',
  },
  {
    src: '/images/homepage/manufacturing/manual-through-hole-assembly.webp',
    alt: 'Operator soldering through-hole components on a PCBA production line',
    width: 1200,
    height: 1721,
    tag: 'THROUGH-HOLE ASSEMBLY',
    title: 'Manual soldering and DIP workmanship',
    span: 'lg:col-span-5',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 41vw',
    position: 'object-[center_62%]',
  },
  {
    src: '/images/homepage/manufacturing/aoi-inspection-review.webp',
    alt: 'Operator reviewing an assembled board at an AOI inspection workstation',
    width: 1272,
    height: 920,
    tag: 'AOI INSPECTION',
    title: 'Operator-led inspection review',
    span: 'lg:col-span-5',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 41vw',
    position: 'object-center',
  },
  {
    src: '/images/homepage/manufacturing/x-ray-pcba-inspection.webp',
    alt: 'Technician operating X-ray inspection equipment for PCBA review',
    width: 1272,
    height: 912,
    tag: 'X-RAY INSPECTION',
    title: 'Inspection for assemblies that require X-ray review',
    span: 'lg:col-span-4',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw',
    position: 'object-center',
  },
  {
    src: '/images/homepage/manufacturing/finished-pcba-batch.webp',
    alt: 'Batches of assembled PCBA boards arranged in protective trays',
    width: 1400,
    height: 876,
    tag: 'FINISHED PCBA',
    title: 'Assembled boards organized by production batch',
    span: 'lg:col-span-4',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw',
    position: 'object-center',
  },
  {
    src: '/images/homepage/manufacturing/anti-static-packing.webp',
    alt: 'Operator packing finished PCBA boards into anti-static bags',
    width: 1400,
    height: 876,
    tag: 'PACKING',
    title: 'Anti-static protection before finished delivery',
    span: 'lg:col-span-4',
    sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw',
    position: 'object-center',
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
                width={image.width}
                height={image.height}
                quality={78}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] ${image.position}`}
                sizes={image.sizes}
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
