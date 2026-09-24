export const SITE = {
  url: 'https://huitaipcb.com',
  brandName: 'Huitai PCB',
  shortName: 'Huitai',
  organizationId: 'https://huitaipcb.com/#organization',
  websiteId: 'https://huitaipcb.com/#website',
  email: 'sales@huitaipcb.com',
  phone: '+86 184 2008 5181',
  logoUrl: 'https://huitaipcb.com/icon.png',
} as const;

export const PCBA_SERVICES = [
  'PCB assembly',
  'SMT assembly',
  'Through-hole and DIP assembly',
  'BOM sourcing',
  'Programming',
  'Functional testing',
  'Prototype production',
  'Small-batch production',
  'Mass production',
] as const;

// Approved display projection from docs/company-entity-facts.md (U3).
// Shared public facts for the V3 preview and current contact/footer projection.
export const COMPANY_PUBLIC_PROFILE = {
  brand: {
    name: SITE.brandName,
    role: 'Customer-facing brand',
    positioning: 'PCBA Manufacturer in Shenzhen, China',
  },
  manufacturer: {
    name: '深圳市会泰精密科技有限公司',
    role: 'Current manufacturing entity',
    facilityAddress: '深圳市宝安区沙井街道共和社区第三工业区GX12栋四层',
    // U4: owner confirmed this existing map pin for the current GX12 facility, 2026-09-23.
    facilityMapQuery: '22.752083,113.798848',
    scope: [
      'PCB fabrication', 'SMT assembly', 'DIP / through-hole assembly',
      'Manual soldering', 'Programming', 'AOI', 'X-ray', 'Functional testing',
      'Finished assembly', 'Packing', 'Prototype production',
      'Low-volume production', 'Repeat production', 'Mass production',
    ],
  },
  commercial: {
    name: '深圳市会泰电子科技有限公司',
    role: 'Commercial / Contracting / Payment / Invoice Entity',
    responsibilities: [
      'Customer commercial cooperation', 'Pro forma invoices and commercial documents',
      'Customer contracts', 'Payment collection', 'Invoicing',
    ],
  },
} as const;

// Google Maps > Share > Embed a map for the owner-confirmed GX12 facility pin.
export const FACILITY_GOOGLE_MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3679.358236691015!2d113.79884799999999!3d22.752083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQ1JzA3LjUiTiAxMTPCsDQ3JzU1LjkiRQ!5e0!3m2!1sen!2sus!4v1790147669569!5m2!1sen!2sus';
