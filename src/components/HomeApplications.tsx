import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const APPLICATIONS = [
  {
    title: 'Industrial control',
    description: 'Control cabinets, automation controllers, gateways, and field interfaces.',
    image: '/images/homepage/applications/industrial-control.webp',
    alt: 'Industrial control cabinet with an installed controller PCBA',
  },
  {
    title: 'IoT & connected devices',
    description: 'Network gateways, wireless controllers, and connected hardware platforms.',
    image: '/images/homepage/applications/iot-connected-devices.webp',
    alt: 'Connected network gateway with its internal PCBA visible',
  },
  {
    title: 'Power electronics',
    description: 'Power conversion, drive, charging, and energy-control assemblies.',
    image: '/images/homepage/applications/power-electronics.webp',
    alt: 'Power electronics assembly with transformers, capacitors, and heat sinks',
  },
  {
    title: 'Consumer electronics',
    description: 'Smart-home controllers and other connected consumer hardware.',
    image: '/images/homepage/applications/consumer-electronics.webp',
    alt: 'Smart-home devices opened to show their internal PCB assemblies',
  },
  {
    title: 'Medical & wearable',
    description: 'Portable monitoring and non-implantable electronic sub-assemblies.',
    image: '/images/homepage/applications/medical-monitoring.webp',
    alt: 'Portable patient monitor opened to show its internal PCBA',
  },
  {
    title: 'Test & measurement',
    description: 'Instrument control, data acquisition, and bench-tested assemblies.',
    image: '/images/homepage/applications/test-measurement.webp',
    alt: 'Technician testing an assembled circuit board on an instrument bench',
  },
];

export default function HomeApplications() {
  return (
    <section className="font-body-cc bg-cc-card px-[5vw] py-20 text-cc-heading md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <div className="font-mono-cc mb-3 text-[11px] font-semibold tracking-[0.18em] text-cc-copper-ink">
              APPLICATIONS
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[44px]">
              PCBA support for practical hardware products.
            </h2>
            <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-cc-body">
              Project fit is confirmed from the actual files, components, quantity,
              workmanship needs, and testing requirements—not from the industry label alone.
            </p>
          </div>
          <Link
            href="/industries"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-cc-heading underline decoration-cc-copper/50 underline-offset-4 hover:text-cc-copper-ink"
          >
            View all applications
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {APPLICATIONS.map(({ title, description, image, alt }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-cc-line-light bg-cc-paper transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="overflow-hidden bg-cc-mist">
                <Image
                  src={image}
                  alt={alt}
                  width={1200}
                  height={751}
                  quality={82}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  sizes="(max-width: 640px) 90vw, (max-width: 1279px) 45vw, 30vw"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-lg font-bold text-cc-heading">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cc-body">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
