import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Factory,
  Gauge,
  HousePlug,
  RadioTower,
} from 'lucide-react';

const APPLICATIONS = [
  { title: 'Industrial control', description: 'Controllers, gateways, motor drivers, and automation boards.', icon: Factory },
  { title: 'IoT & connected devices', description: 'Sensor nodes, wireless modules, and connected product boards.', icon: RadioTower },
  { title: 'Power electronics', description: 'Power conversion, BMS, charging, and motor-control assemblies.', icon: BatteryCharging },
  { title: 'Consumer electronics', description: 'Smart-home, audio, wearable, and connected product assemblies.', icon: HousePlug },
  { title: 'Medical & wearable', description: 'Non-implantable monitoring and portable instrument sub-assemblies.', icon: Activity },
  { title: 'Test & measurement', description: 'Data acquisition, signal, control, and instrument boards.', icon: Gauge },
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

        <div className="grid gap-px overflow-hidden rounded-2xl border border-cc-line-light bg-cc-line-light sm:grid-cols-2 lg:grid-cols-3">
          {APPLICATIONS.map(({ title, description, icon: Icon }) => (
            <article key={title} className="bg-cc-paper p-6 md:p-7">
              <Icon size={22} strokeWidth={1.8} className="text-cc-copper-ink" />
              <h3 className="font-display mt-5 text-lg font-bold text-cc-heading">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-cc-body">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
