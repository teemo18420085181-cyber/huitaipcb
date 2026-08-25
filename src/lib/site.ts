export const SITE = {
  url: 'https://huitaipcb.com',
  brandName: 'Huitai PCB',
  shortName: 'Huitai',
  legalName: 'Shenzhen Huitai Electronics Technology Co., Ltd.',
  organizationId: 'https://huitaipcb.com/#organization',
  websiteId: 'https://huitaipcb.com/#website',
  email: 'sales@huitaipcb.com',
  phone: '+86 184 2008 5181',
  logoUrl: 'https://huitaipcb.com/icon.png',
  address: {
    streetAddress: 'Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing',
    addressLocality: "Bao'an District",
    addressRegion: 'Shenzhen',
    addressCountry: 'CN',
  },
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
