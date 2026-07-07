import { seoPages } from '@/lib/content/seoPages';
import { deSeoPages } from '@/lib/content/seoPages.de';

export const dictionaries = {
  en: {
    seoPages,
    seoLanding: {
      defaultCtaHeading: 'Send Your Files for Engineering Review',
      defaultCtaBody:
        'Send your Gerber files, BOM list, quantity, and testing requirements. Huitai will review the available information before quotation.',
      defaultPrimaryCtaLabel: 'Upload Gerber & BOM for Engineering Review',
      fileChecklistLabel: 'See RFQ File Checklist',
      heroReviewPoints: ['Gerber + BOM review', 'BOM shortage check', 'SMT/DIP scope discussion', 'Testing requirements'],
      buyerFileReview: 'BUYER FILE REVIEW',
      buyerCardTitle: 'Engineering review by email',
      buyerCardBody: 'Scope, missing files, sourcing risks, and testing questions are clarified before quote.',
      quickAnswer: 'QUICK ANSWER',
      whoThisIsFor: 'Who this is for',
      whatFilesWeNeed: 'What files we need',
      whatWeCheckBeforeProduction: 'What we check before production',
      whatWeCanCoordinate: 'What We Can Coordinate',
      workflow: 'Workflow',
      stepLabel: 'STEP',
      relatedServicePaths: 'Related service paths',
      filesNeeded: 'What files we need',
      faq: 'FAQ',
      sidebarEyebrow: 'EMAIL REVIEW PATH',
      sidebarText: 'Send what you have. We will reply with the next questions or review path.',
      sidebarLabel: 'SEND RFQ',
      sidebarHeading: 'Start with your available files.',
      sidebarBody:
        'Send Gerber files, BOM lists, PCB drawings, sample photos, schematic if available, assembly requirements, and testing requirements.',
      relatedPages: 'Related pages',
      sidebarChecklist: [
        'Gerber / drill files',
        'BOM with manufacturer part numbers',
        'Quantity target and schedule',
        'Testing or inspection notes',
      ],
    },
  },
  de: {
    seoPages: deSeoPages,
    seoLanding: {
      defaultCtaHeading: 'Dateien für technische Prüfung senden',
      defaultCtaBody:
        'Senden Sie Gerber-Daten, BOM, Stückzahl und Prüfanforderungen. Huitai prüft die verfügbaren Informationen vor der Angebotserstellung.',
      defaultPrimaryCtaLabel: 'Gerber & BOM zur Prüfung senden',
      fileChecklistLabel: 'RFQ-Datei-Checkliste ansehen',
      heroReviewPoints: ['Gerber- und BOM-Prüfung', 'BOM-Risiken prüfen', 'SMT-/DIP-Umfang klären', 'Prüfanforderungen'],
      buyerFileReview: 'DATEIPRÜFUNG',
      buyerCardTitle: 'Rückfragen per E-Mail',
      buyerCardBody: 'Umfang, fehlende Dateien, Beschaffungsrisiken und Prüfanforderungen werden vor dem Angebot geklärt.',
      quickAnswer: 'KURZANTWORT',
      whoThisIsFor: 'Geeignet fuer',
      whatFilesWeNeed: 'Welche Dateien wir benoetigen',
      whatWeCheckBeforeProduction: 'Was wir vor der Fertigung pruefen',
      whatWeCanCoordinate: 'Was Huitai koordinieren kann',
      workflow: 'Ablauf',
      stepLabel: 'SCHRITT',
      relatedServicePaths: 'Verwandte Servicepfade',
      filesNeeded: 'Benötigte Dateien',
      faq: 'FAQ',
      sidebarEyebrow: 'PROJEKTANFRAGE PER E-MAIL',
      sidebarText: 'Senden Sie die verfügbaren Dateien. Wir antworten mit Rückfragen oder dem nächsten Prüfschritt.',
      sidebarLabel: 'ANFRAGE SENDEN',
      sidebarHeading: 'Starten Sie mit den verfügbaren Dateien.',
      sidebarBody:
        'Senden Sie Gerber-Daten, BOM, PCB-Zeichnungen, Musterfotos, Schaltplan falls vorhanden, Bestückungshinweise und Prüfanforderungen.',
      relatedPages: 'Verwandte Seiten',
      sidebarChecklist: [
        'Gerber- / Bohrdaten',
        'BOM mit Herstellerteilenummern',
        'Zielstückzahl und Terminrahmen',
        'Prüf- oder Inspektionshinweise',
      ],
    },
    home: {
      metadata: {
        title: 'Leiterplattenbestückung China | Huitai Electronics',
        description:
          'Turnkey PCBA aus China für B2B-Hardwareprojekte: Gerber- und BOM-Prüfung, PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Prüfunterstützung und Lieferung.',
      },
      eyebrow: 'TURNKEY PCBA / SHENZHEN, CHINA',
      title: 'Von Gerber-Daten zur fertigen PCBA.',
      intro:
        'Huitai Electronics unterstützt internationale Hardwareteams bei Turnkey-PCBA-Projekten: technische Prüfung von Gerber und BOM, PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Prüfunterstützung, Verpackung und Lieferung.',
      primaryCta: 'Gerber & BOM zur Prüfung senden',
      secondaryCta: 'BOM-Risiken besprechen',
      keyPagesLabel: 'WICHTIGE PCBA-SEITEN',
      keyLinks: [
        { label: 'Turnkey PCBA aus China', href: '/de/turnkey-pcb-assembly' },
        { label: 'PCBA-Angebot aus China', href: '/de/china-pcb-assembly' },
        { label: 'BOM- und Bauteilbeschaffung', href: '/de/bom-sourcing-pcb-assembly' },
        { label: 'PCBA-Prototypenfertigung', href: '/de/prototype-pcb-assembly' },
        { label: 'Gerber & BOM hochladen', href: '/de/contact#project-files' },
      ],
      whatWeDo: {
        eyebrow: 'WAS HUITAI KOORDINIERT',
        title: 'Ein zusammenhängender PCBA-Prozess statt getrennter Einzelschritte.',
        items: [
          {
            title: 'PCB-Herstellung',
            body: 'Gerber- und Bohrdaten werden zusammen mit Spezifikationen, Lagenaufbau und Bestückungsanforderungen geprüft.',
          },
          {
            title: 'Bauteilbeschaffung',
            body: 'BOM, MPNs, Verfügbarkeit, Gehäusekompatibilität und Alternativen werden vor Einkauf und Bestückung besprochen.',
          },
          {
            title: 'SMT-/DIP-Bestückung',
            body: 'SMD- und Durchsteckmontage werden als Teil des bestätigten Turnkey-PCBA-Umfangs koordiniert.',
          },
          {
            title: 'Inspektion & Prüfunterstützung',
            body: 'Prüfpunkte, funktionale Tests und Akzeptanzkriterien werden projektbezogen anhand Ihrer Vorgaben abgestimmt.',
          },
        ],
      },
      process: {
        eyebrow: 'ABLAUF',
        title: 'Von der Datei zur lieferbereiten Baugruppe.',
        steps: [
          'Gerber, BOM, Stückzahl und Prüfhinweise einreichen',
          'Technische Prüfung von Dateien, BOM-Risiken und Bestückungsumfang',
          'PCB-Herstellung und Bauteilbeschaffung nach bestätigtem Umfang koordinieren',
          'SMT-/DIP-Bestückung, Inspektion und abgestimmte Prüfung durchführen',
          'Verpackung und Lieferung nach finaler Prüfung vorbereiten',
        ],
      },
      fit: {
        eyebrow: 'GEEIGNET FÜR',
        title: 'Für Prototypen, Kleinserien und Turnkey-PCBA-Projekte.',
        items: [
          'Prototypenfertigung zur Prüfung von Design, BOM und Bestückbarkeit',
          'Kleinserien, bei denen Beschaffung und Fertigung zusammen geplant werden müssen',
          'BOM-Sourcing mit Freigabeprozess für Alternativen',
          'Internationale B2B-Teams, die PCBA aus China koordinieren möchten',
        ],
      },
      trust: {
        eyebrow: 'KLARE PROJEKTABSTIMMUNG',
        title: 'Technische Rückfragen vor Angebot und Fertigung.',
        items: ['DFM- und Dateiprüfung', 'BOM-Risiken und Bauteilalternativen', 'IQC / Wareneingangsprüfung', 'AOI und Inspektion', 'Prüfumfang nach Projektvorgaben'],
      },
      finalCta: {
        title: 'Bereit für eine technische PCBA-Prüfung?',
        body: 'Senden Sie Gerber-Daten, BOM, Stückzahl, Zeichnungen und Prüfanforderungen. Huitai prüft den Turnkey-PCBA-Umfang vor der Angebotserstellung.',
        label: 'Gerber & BOM hochladen',
      },
    },
    contact: {
      metadata: {
        title: 'PCBA-Anfrage senden | Gerber, BOM & Projektdaten hochladen',
        description:
          'Senden Sie Gerber, BOM, Zeichnungen, Musterfotos oder Projekthinweise für eine technische PCBA-Prüfung. Huitai prüft Umfang, Bauteilrisiken und Prüfanforderungen vor dem Angebot.',
      },
      eyebrow: 'TECHNISCH GEPRÜFTE RFQ',
      title: 'Gerber & BOM für PCBA-Angebotsprüfung hochladen',
      intro:
        'Senden Sie Gerber-Daten, BOM, Zeichnungen, Musterfotos oder Projekthinweise für eine technische Prüfung vor dem Angebot. Huitai prüft Turnkey-PCBA-Umfang, Bauteilbeschaffungsrisiken, Prüfbedarf und Details für Prototypen oder Kleinserien.',
      steps: ['Technische Prüfung vor dem Angebot', 'Gerber- und BOM-Prüfung', 'Rückfragen und nächster Prüfschritt per E-Mail'],
      usefulFilesTitle: 'NÜTZLICHE DATEIEN',
      usefulFiles: [
        'Gerber-Daten und BOM',
        'Pick-and-Place-Datei oder Bestückungszeichnung',
        'Stückzahl, Prototyp oder Kleinserienziel',
        'Prüfanforderungen oder Musterfotos',
      ],
      nextTitle: 'WAS ALS NÄCHSTES PASSIERT',
      nextItems: [
        'Wir prüfen Dateien und klären fehlende Details',
        'BOM-Beschaffung, Bestückung und Prüfrahmen werden abgestimmt',
        'Sie erhalten Rückfragen oder einen Angebotsweg',
        'NDA kann bei Bedarf vor Dateiaustausch besprochen werden',
      ],
      chatEyebrow: 'DIREKT SCHREIBEN?',
      chatTitle: 'Kontaktieren Sie uns direkt',
      chatBody: 'Für eine kurze Frage oder den Start einer Projektanfrage erreichen Sie uns per WhatsApp oder über den WeChat-Code.',
      chatButton: 'WhatsApp öffnen',
      wechatLabel: 'WECHAT-CODE SCANNEN',
      findEyebrow: 'STANDORT',
      findTitle: 'Shenzhen, China',
      findBody: 'Building D, 4F, Zhaochang Industrial Park, Gonghe Industrial Road, Shajing, Bao’an District, Shenzhen, China',
      mapsLabel: 'In Google Maps öffnen',
    },
  },
} as const;

export type DictionaryLocale = keyof typeof dictionaries;
