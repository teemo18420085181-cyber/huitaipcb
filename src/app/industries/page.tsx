import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import { OG_IMAGES } from '@/lib/seo/og';

export const metadata = {
  title: 'Industries We Serve | Huitai Electronics',
  description: 'Turnkey PCBA for industrial control, IoT, power electronics, LED, consumer electronics, automotive aftermarket, medical wearable, and test equipment.',
  alternates: { canonical: 'https://huitaipcb.com/industries' },
  openGraph: { url: 'https://huitaipcb.com/industries', images: OG_IMAGES },
};

const INDUSTRIES = [
  {
    n: '01', tag: 'INDUSTRIAL CONTROL',
    title: 'Reliable boards for factory automation and machinery.',
    desc: 'Control boards, step drivers, relay modules, IO expanders, and embedded controllers for PLCs, CNC machines, conveyor systems, and industrial automation. We understand the requirements for extended temperature range, vibration resistance, and long product life cycles.',
    examples: ['PLC I/O expansion modules', 'Motor driver & servo boards', 'DIN rail control units', 'RS-485 / Ethernet gateway boards', 'Industrial HMI controller boards', 'Safety relay modules'],
    image: '/factory/ind-01.png',
  },
  {
    n: '02', tag: 'IoT & CONNECTED DEVICES',
    title: 'Wireless modules and sensor nodes for the connected world.',
    desc: 'WiFi, BLE, LoRa, NB-IoT, and 4G/LTE communication boards. From ESP32-based prototypes to custom RF-certified modules. We have experience with compact board design, low-power circuit requirements, and antenna layout for reliable wireless performance.',
    examples: ['WiFi / BLE sensor nodes', 'LoRa gateway boards', 'NB-IoT tracker modules', '4G/LTE communication modules', 'Smart meter sub-boards', 'Edge computing nodes'],
    image: '/factory/ind-02.png',
  },
  {
    n: '03', tag: 'POWER ELECTRONICS',
    title: 'Power supply and conversion boards built to handle the load.',
    desc: 'DC-DC converters, AC-DC power supplies, motor drivers, BMS (battery management systems), UPS inverter boards, and EV charging station boards. High-current trace routing, thermal management, and heavy copper are our specialty.',
    examples: ['DC-DC buck / boost converters', 'Battery management systems', 'Motor driver boards', 'EV charging station controllers', 'UPS inverter boards', 'Solar MPPT controllers'],
    image: '/factory/ind-03.png',
  },
  {
    n: '04', tag: 'LED & LIGHTING CONTROL',
    title: 'Driver boards and control systems for smart lighting.',
    desc: 'LED driver boards, PWM dimming controllers, RGB/RGBW color management boards, smart lighting system controllers, and aluminum MCPCB substrates for high-power LED arrays. We manufacture and assemble LED boards at any scale.',
    examples: ['PWM LED dimming controllers', 'DALI / 0-10V driver boards', 'RGB / RGBW color controllers', 'High-power LED MCPCB arrays', 'Smart home lighting modules', 'Horticultural grow light boards'],
    image: '/factory/ind-04.png',
  },
  {
    n: '05', tag: 'CONSUMER ELECTRONICS',
    title: 'Smart home and consumer product boards at volume.',
    desc: 'Smart home touch panels, audio devices, wireless charging receivers, wearable base boards, and consumer IoT products. We understand the design requirements for compact form factor, cost optimization, and the high volume inspection standards that consumer products demand.',
    examples: ['Smart home touch controllers', 'Wireless charging boards', 'Audio DSP boards', 'Smart speaker sub-boards', 'Consumer wearable bases', 'Smart appliance control boards'],
    image: '/factory/ind-05.png',
  },
  {
    n: '06', tag: 'AUTOMOTIVE AFTERMARKET',
    title: 'Diagnostic tools, tracking, and vehicle electronics.',
    desc: 'OBD diagnostic modules, GPS trackers, dash camera boards, CAN bus interface modules, and automotive sensor boards for the aftermarket. We manufacture to AEC-Q100 component specs where required and can support extended temperature testing.',
    examples: ['OBD-II diagnostic modules', 'GPS vehicle trackers', 'Dash camera main boards', 'CAN bus data loggers', 'Tire pressure monitoring', 'Fleet management modules'],
    image: '/factory/ind-06.png',
  },
  {
    n: '07', tag: 'MEDICAL & WEARABLE',
    title: 'Precision miniaturized boards for health monitoring.',
    desc: 'Patient monitoring devices, wearable health sensors, portable medical instruments, and lab equipment sub-boards (non-implantable, non-life-critical). IPC workmanship requirements can be discussed based on project needs.',
    examples: ['Wearable ECG / SpO2 sensors', 'Patient monitoring sub-boards', 'Portable glucometer boards', 'Rehabilitation device controllers', 'Lab instrument modules', 'Biometric authentication boards'],
    image: '/factory/ind-07.png',
  },
  {
    n: '08', tag: 'TEST & MEASUREMENT EQUIPMENT',
    title: 'High-complexity boards inside precision instruments.',
    desc: 'Spectrum analyzers, oscilloscopes, data acquisition systems, signal generators, and lab instrumentation main boards. These boards often demand tight impedance control, shielded RF sections, precision analog routing, and clearly agreed workmanship requirements.',
    examples: ['Spectrum analyzer boards', 'Oscilloscope acquisition boards', 'Data acquisition modules', 'Signal generator boards', 'LCR meter main boards', 'Calibration instrument sub-boards'],
    image: '/factory/ind-08.png',
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <main className="pt-[64px] min-h-screen bg-cc-carbon">
        <section className="relative px-[5vw] py-16 md:py-24 bg-cc-carbon-2 text-white overflow-hidden">
          <div className="absolute -top-[100px] right-[10%] w-[300px] h-[300px] rounded-full opacity-30" style={{ background: '#E6A85A', filter: 'blur(100px)' }} />
          <div className="absolute -bottom-[100px] left-[10%] w-[280px] h-[280px] rounded-full opacity-20" style={{ background: '#9EE34F', filter: 'blur(100px)' }} />
          <div className="relative z-10 max-w-[1080px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cc-copper/10 border border-cc-copper/40 text-cc-copper-soft text-[11px] tracking-[0.14em] py-1.5 px-3.5 rounded-full mb-6 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cc-copper" style={{ boxShadow: '0 0 12px #E6A85A' }} />
              INDUSTRIES WE SERVE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold leading-tight tracking-tight mb-5">
              From startups to scale-ups.
              <br />
              <em className="not-italic text-cc-copper-soft">Across practical B2B use cases.</em>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-[680px] mx-auto">
              We&apos;ve shipped boards for hardware teams across industrial, IoT, consumer, automotive aftermarket, medical, and test equipment sectors. Whatever your industry — we&apos;ve likely built a board like yours.
            </p>
          </div>
        </section>

        <section className="px-[5vw] py-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.n} className="group bg-cc-carbon-2 border border-cc-line rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cc-carbon-2/70 via-cc-carbon-2/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-cc-copper flex items-center justify-center text-cc-ink text-[12px] font-bold shadow-md">{ind.n}</div>
                    <div className="text-[9px] text-white/70 tracking-[0.18em] font-medium bg-cc-carbon-2/50 backdrop-blur px-2.5 py-1 rounded-full">{ind.tag}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-cc-ink mb-2 leading-tight">{ind.title}</h3>
                  <p className="text-sm text-cc-ink-mute leading-relaxed mb-4">{ind.desc}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ind.examples.map((e, ei) => (
                      <div key={ei} className="flex items-center gap-1.5 text-[11px] text-cc-ink-mute">
                        <span className="w-1 h-1 rounded-full bg-cc-copper flex-shrink-0" />{e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-[5vw] pb-20">
          <div className="max-w-[820px] mx-auto bg-cc-carbon-2 rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[80px] -right-[80px] w-[200px] h-[200px] rounded-full opacity-20" style={{ background: '#E6A85A', filter: 'blur(60px)' }} />
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">Don&apos;t see your industry listed?</h2>
            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-[500px] mx-auto">Send us your Gerber files and we&apos;ll confirm if we can manufacture your board. If we&apos;ve never made a board like it, we&apos;ll tell you upfront.</p>
            <TrackedLink href="/contact" eventName="quote_click" eventParams={{ location: 'industries_bottom_cta', destination: '/contact', button_text: 'Send us your project' }} className="inline-flex items-center gap-2 bg-cc-copper text-cc-ink text-sm font-semibold py-3 px-7 rounded-xl hover:-translate-y-0.5 transition-all" style={{ boxShadow: '0 4px 20px rgba(252,234,11,.3)' }}>
              Send us your project →
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
