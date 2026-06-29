import type { SeoLandingPage } from '@/lib/content/seoPages';

const commonFilesDe = [
  'Gerber- und Bohrdaten',
  'BOM/Stückliste mit MPNs, Mengen, Designatoren und freigegebenen Alternativen',
  'PCB-Spezifikation, Lagenaufbau oder Fertigungshinweise, sofern vorhanden',
  'CPL-/Pick-and-Place-Daten, wenn verfügbar',
  'Bestückungszeichnung, Musterfotos oder Orientierungshinweise',
  'Stückzahl, Prüfanforderungen, Terminrahmen und Versandziel',
];

export const deSeoPages: Record<string, SeoLandingPage> = {
  'turnkey-pcb-assembly': {
    slug: 'turnkey-pcb-assembly',
    title: 'Turnkey-Leiterplattenbestückung und PCBA-Fertigung aus China',
    seoTitle: 'Turnkey PCBA aus China | Gerber- & BOM-Prüfung',
    metaDescription:
      'Turnkey PCBA-Fertigung aus China: PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Prüfunterstützung und Lieferung nach Gerber- und BOM-Prüfung.',
    eyebrow: 'TURNKEY PCBA AUS CHINA',
    primaryKeyword: 'Turnkey PCBA aus China',
    serviceName: 'Turnkey-Leiterplattenbestückung und PCBA-Fertigung aus China',
    serviceType: 'Turnkey-PCBA-Fertigung',
    quickAnswer:
      'Turnkey PCBA bedeutet, dass PCB-Herstellung, BOM- und Bauteilbeschaffung, SMT-Bestückung, optionale DIP-Bestückung, Inspektion, abgestimmte Prüfunterstützung, Verpackung und Lieferung als zusammenhängendes Projekt geprüft und koordiniert werden.',
    intro:
      'Senden Sie Gerber-Daten und BOM für eine technische Prüfung vor der Angebotserstellung. Huitai koordiniert Turnkey-PCBA aus China: PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Inspektion, Prüfunterstützung, Verpackung und Lieferung für Prototypen und Kleinserien.',
    sections: [
      {
        heading: 'Was umfasst Turnkey-PCBA?',
        body: 'Der Umfang kann PCB-Herstellung, BOM-Prüfung, Bauteilbeschaffung, Einkauf nach Freigabe, SMT-Bestückung, optionale DIP-Bestückung, Inspektion, projektbezogene Prüfunterstützung, Verpackung und Versandvorbereitung umfassen.',
      },
      {
        heading: 'Angebotsfaktoren früh klären',
        body: 'PCB-Spezifikationen, BOM-Verfügbarkeit, Stückzahl, Bestückungskomplexität, Alternativen, Prüfanforderungen, Verpackung und Versandziel beeinflussen den Angebotsumfang. Diese Punkte werden vor der Angebotserstellung geprüft.',
      },
      {
        heading: 'Dateien für den Start der Prüfung',
        body: 'Gerber- und Bohrdaten, BOM, CPL-/Pick-and-Place-Daten, Bestückungszeichnungen, Stückzahl, Musterfotos, Prüfhinweise, Firmware oder Prüfvorrichtungen helfen, den PCBA-Umfang vor der Fertigung einzugrenzen.',
      },
      {
        heading: 'Unvollständige BOM und Alternativen',
        body: 'Wenn eine BOM unvollständig ist, kann Huitai fehlende MPNs, unklare Gehäuse, abgekündigte oder schwer verfügbare Bauteile und mögliche Alternativen prüfen. Alternativen werden vor Einkauf oder Bestückung mit dem Kunden abgestimmt.',
      },
      {
        heading: 'Für Prototypen und Kleinserien',
        body: 'Turnkey-PCBA passt zu Projekten, bei denen Entwicklungsteams PCB-Herstellung, Bauteilbeschaffung, Bestückung, Prüfklärung und Lieferung nicht über mehrere getrennte Lieferanten koordinieren möchten.',
      },
    ],
    bullets: [
      'PCB-Herstellung als Teil des PCBA-Projekts',
      'BOM- und Bauteilbeschaffung mit Freigabeprozess',
      'SMT-Bestückung und optionale DIP-Bestückung',
      'Inspektion und Prüfunterstützung nach abgestimmtem Umfang',
      'Verpackung und Versandvorbereitung für fertige PCBA',
    ],
    workflow: [
      'Gerber, BOM, Stückzahl und Prüfanforderungen senden',
      'Dateien, Angebotsfaktoren, BOM-Risiken und fehlende Angaben prüfen',
      'PCB-Herstellung, Bauteilbeschaffung, Alternativen, SMT/DIP und Prüfrahmen abstimmen',
      'Freigegebene Bauteile beschaffen und Bestückung nach bestätigtem Umfang koordinieren',
      'Inspektion, abgestimmte Prüfung, Verpackung und Lieferung vorbereiten',
    ],
    filesNeeded: commonFilesDe,
    relatedLinks: [
      { label: 'BOM- und Bauteilbeschaffung prüfen', href: '/de/bom-sourcing-pcb-assembly' },
      { label: 'PCBA-Angebot aus China anfragen', href: '/de/china-pcb-assembly' },
      { label: 'Prototypen-PCBA prüfen lassen', href: '/de/prototype-pcb-assembly' },
      { label: 'Gerber und BOM hochladen', href: '/de/contact#project-files' },
    ],
    ctaHeading: 'Gerber & BOM für technische Prüfung senden',
    ctaBody:
      'Senden Sie Gerber-Daten, BOM, Stückzahl, CPL-/Pick-and-Place-Daten, Zeichnungen und Prüfanforderungen. Huitai prüft PCB-Herstellung, Bauteilbeschaffung, Bestückung, Prüfrahmen, Verpackung und Lieferung vor dem Angebot.',
    primaryCtaLabel: 'Gerber & BOM zur Prüfung senden',
    faq: [
      {
        question: 'Was beinhaltet Turnkey-Leiterplattenbestückung?',
        answer:
          'Turnkey-Leiterplattenbestückung kann PCB-Herstellung, BOM- und Bauteilbeschaffung, Einkauf nach Kundenfreigabe, SMT-Bestückung, optionale DIP-Bestückung, Inspektion, abgestimmte Prüfunterstützung, Verpackung und Versandvorbereitung umfassen.',
      },
      {
        question: 'Welche Dateien werden benötigt?',
        answer:
          'Gerber- und Bohrdaten, BOM, Stückzahl, CPL- oder Pick-and-Place-Daten, Zeichnungen, Musterfotos und Prüfhinweise helfen, den Umfang für Angebot und Fertigung zu prüfen.',
      },
      {
        question: 'Kann eine unvollständige BOM geprüft werden?',
        answer:
          'Ja. Fehlende MPNs, unklare Gehäuse, abgekündigte oder nicht verfügbare Bauteile und mögliche Alternativen können vor Angebot, Einkauf oder Bestückung geprüft und mit dem Kunden abgestimmt werden.',
      },
      {
        question: 'Sind Prototypen und Kleinserien geeignet?',
        answer:
          'Ja, wenn das Projekt PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Inspektion, Prüfklärung und Lieferung als zusammenhängende PCBA-Leistung benötigt.',
      },
      {
        question: 'Wie wird der Prüfrahmen festgelegt?',
        answer:
          'Der Prüfrahmen wird anhand von Kundenvorgaben wie Testanweisungen, Firmware, Vorrichtungen, Akzeptanzkriterien oder Inspektionshinweisen besprochen und vor der Fertigung bestätigt.',
      },
    ],
  },
  'china-pcb-assembly': {
    slug: 'china-pcb-assembly',
    title: 'Anfrage für Leiterplattenbestückung und PCBA aus China',
    seoTitle: 'Leiterplattenbestückung aus China | PCBA-Angebot prüfen',
    metaDescription:
      'PCBA aus China anfragen: Huitai prüft Gerber, BOM, Stückzahl, Zeichnungen und Prüfanforderungen vor PCB-Herstellung, Bauteilbeschaffung und SMT-Bestückung.',
    eyebrow: 'PCBA AUS CHINA',
    primaryKeyword: 'Leiterplattenbestückung aus China',
    serviceName: 'Anfrageprüfung für Leiterplattenbestückung aus China',
    serviceType: 'Turnkey-PCBA-Service aus China',
    quickAnswer:
      'Huitai Electronics ist ein Turnkey-PCBA-Lieferant in Shenzhen für internationale B2B-Projekte, bei denen PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Inspektion, Prüfunterstützung, Verpackung und Lieferung zusammen betrachtet werden.',
    intro:
      'Senden Sie Gerber-Daten, BOM, Stückzahl, Zeichnungen, Musterfotos und Prüfanforderungen für eine technische Prüfung vor dem Angebot. Huitai prüft den Turnkey-PCBA-Umfang in China von PCB-Herstellung und Bauteilbeschaffung bis SMT-/DIP-Bestückung, Inspektion, Prüfunterstützung, Verpackung und Lieferung.',
    sections: [
      {
        heading: 'Technische Prüfung vor dem Angebot',
        body: 'Ein belastbares Angebot für Leiterplattenbestückung aus China beginnt mit Gerber-Daten, BOM, Zielstückzahl, Zeichnungen und Prüfanforderungen. Huitai prüft, welche Informationen vollständig sind und welche Punkte vor dem Angebot geklärt werden sollten.',
      },
      {
        heading: 'Turnkey-Umfang hinter dem Angebot',
        body: 'Die Prüfung umfasst PCB-Herstellung, BOM- und Bauteilbeschaffung, SMT-Bestückung, Durchsteckmontage (DIP), Inspektion, abgestimmte Prüfunterstützung, Verpackung und Versandvorbereitung als verbundenen PCBA-Prozess.',
      },
      {
        heading: 'Angebotsfaktoren früh abstimmen',
        body: 'Stückzahl, BOM-Verfügbarkeit, Gehäusekompatibilität, PCB-Spezifikationen, Bestückungshinweise, Prüfanforderungen, Verpackung und Versandziel können den Angebotsumfang beeinflussen.',
      },
      {
        heading: 'Für internationale PCBA-Einkäufer',
        body: 'Diese Seite richtet sich an Ingenieurteams, Hardware-Startups und Einkaufsteams, die einen China-basierten PCBA-Partner für Prototypen oder Kleinserien mit zusammenhängender Fertigungskoordination suchen.',
      },
    ],
    bullets: [
      'PCB-Herstellung als Teil der PCBA-Lieferung',
      'Bauteilbeschaffung und kundenseitig freigegebene Alternativen',
      'SMT-Bestückung und DIP-Bestückung',
      'Inspektion und funktionale Prüfunterstützung nach bestätigten Anforderungen',
      'Prüfung von Prototypen- und Kleinserienprojekten',
      'Verpackung und Versandvorbereitung',
    ],
    workflow: [
      'Gerber, BOM, Stückzahl, Zeichnungen und Prüfanforderungen senden',
      'Technische Prüfung von Dateien, BOM-Risiken und Bestückungshinweisen',
      'Angebotsumfang für PCB-Herstellung, Beschaffung, SMT/DIP, Prüfunterstützung und Lieferung abstimmen',
      'Bauteilalternativen und Prüfannahmen vor Einkauf oder Fertigung bestätigen',
      'Verpackung und Lieferung nach Bestückung und abgestimmten Prüfungen vorbereiten',
    ],
    filesNeeded: commonFilesDe,
    relatedLinks: [
      { label: 'Turnkey-PCBA-Service aus China', href: '/de/turnkey-pcb-assembly' },
      { label: 'BOM- und Bauteilbeschaffung', href: '/de/bom-sourcing-pcb-assembly' },
      { label: 'Prototypen-PCBA prüfen lassen', href: '/de/prototype-pcb-assembly' },
      { label: 'Gerber und BOM hochladen', href: '/de/contact#project-files' },
    ],
    ctaHeading: 'PCBA-Angebot aus China anfragen',
    ctaBody:
      'Laden Sie Gerber-Daten, BOM, Stückzahl, Zeichnungen, Musterfotos und Prüfanforderungen hoch. Huitai prüft den Turnkey-PCBA-Umfang vor dem Angebot und markiert fehlende Dateien, BOM-Risiken oder offene Prüfpunkte.',
    primaryCtaLabel: 'PCBA-Angebot aus China anfragen',
    faq: [
      {
        question: 'Welche Dateien werden für ein PCBA-Angebot aus China benötigt?',
        answer:
          'Hilfreich sind Gerber- und Bohrdaten, BOM mit Herstellerteilenummern, Zielstückzahl, Zeichnungen oder Pick-and-Place-Daten sowie Prüfanforderungen. Damit lassen sich PCB-Herstellung, Bauteilbeschaffung, Bestückung, Prüfung und Lieferung vor dem Angebot prüfen.',
      },
      {
        question: 'Kann eine unvollständige BOM geprüft werden?',
        answer:
          'Ja. Eine teilweise BOM kann geprüft werden, um fehlende MPNs, unklare Gehäuse, nicht ersetzbare Bauteile oder weitere Rückfragen zu identifizieren. Für ein finales Angebot können zusätzliche Angaben erforderlich sein.',
      },
      {
        question: 'Ist Bauteilbeschaffung enthalten?',
        answer:
          'Bauteilbeschaffung kann Teil des Turnkey-PCBA-Projekts sein. Huitai prüft MPN-Klarheit, Verfügbarkeit, Engpassrisiken und mögliche Alternativen, die vor Einkauf und Bestückung vom Kunden freigegeben werden.',
      },
      {
        question: 'Sind Prototypen und Kleinserien möglich?',
        answer:
          'Prototypen- und Kleinserienprojekte können geprüft werden, wenn PCB-Herstellung, Bauteilbeschaffung, SMT-/DIP-Bestückung, Inspektion, Prüfunterstützung und Lieferung zusammen benötigt werden.',
      },
      {
        question: 'Wie werden Prüfanforderungen abgestimmt?',
        answer:
          'Prüfanforderungen werden anhand von Testanweisungen, Firmware, Vorrichtungen, Inspektionskriterien oder Akzeptanzhinweisen besprochen. Funktionale Prüfungen werden erst nach geklärtem Verfahren und Verantwortungsumfang geplant.',
      },
    ],
  },
  'bom-sourcing-pcb-assembly': {
    slug: 'bom-sourcing-pcb-assembly',
    title: 'BOM- und Bauteilbeschaffung für PCBA-Projekte',
    seoTitle: 'BOM Sourcing für PCBA | Bauteilrisiken vor Bestückung prüfen',
    metaDescription:
      'BOM- und Bauteilbeschaffung für PCBA: Huitai prüft MPN-Klarheit, abgekündigte oder schwer verfügbare Bauteile, Gehäusekompatibilität und Alternativen vor Einkauf und SMT-Bestückung.',
    eyebrow: 'BOM- UND BAUTEILBESCHAFFUNG',
    primaryKeyword: 'Bauteilbeschaffung für PCBA',
    serviceName: 'BOM- und Bauteilbeschaffung für PCBA-Projekte',
    serviceType: 'BOM-Sourcing und PCBA-Bestückung',
    quickAnswer:
      'BOM Sourcing für PCBA bedeutet, die Stückliste nicht isoliert zu betrachten, sondern zusammen mit Gerber-, CPL- und Bestückungsdaten auf Verfügbarkeit, MPN-Klarheit, Gehäusekompatibilität, Alternativen und Freigabegrenzen zu prüfen.',
    intro:
      'Senden Sie Ihre BOM für eine Beschaffungs- und Risikoprüfung vor dem PCBA-Angebot. Huitai prüft Vollständigkeit, MPN-Klarheit, abgekündigte oder schwer verfügbare Bauteile, Gehäusekompatibilität, Alternativen und Freigaben zusammen mit Gerber- und Bestückungsdaten, sofern verfügbar.',
    sections: [
      {
        heading: 'BOM-Vollständigkeit und MPN-Klarheit',
        body: 'Eine Beschaffungsprüfung beginnt damit, ob jede BOM-Zeile eine klare Herstellerteilenummer, Designator, Menge, Gehäuse, Wert und mögliche No-Substitute-Hinweise enthält. Fehlende oder unklare MPNs werden vor dem finalen Angebot markiert.',
      },
      {
        heading: 'Abkündigung, Verfügbarkeit und Gehäuserisiken',
        body: 'Huitai prüft abgekündigte Bauteile, schwer verfügbare Komponenten, instabile Beschaffung, Gehäuseabweichungen und Bauteile mit besonderer Behandlung wie Programmierung oder Feuchtigkeitsschutz.',
      },
      {
        heading: 'Alternativen benötigen Kundenfreigabe',
        body: 'Wenn ein Bauteil schwierig zu beschaffen ist, kann Huitai Optionen oder mögliche Alternativen vorschlagen. Austauschbauteile werden nicht automatisch eingesetzt, sondern vor Einkauf oder Bestückung vom Kunden geprüft und freigegeben.',
      },
      {
        heading: 'Gerber und BOM gemeinsam prüfen',
        body: 'Eine BOM kann früh auf Beschaffungsrisiken geprüft werden. Für ein belastbares PCBA-Angebot sollten BOM, Gerber, CPL-/Pick-and-Place-Daten, Zeichnungen, Stückzahl und Prüfhinweise zusammen betrachtet werden.',
      },
      {
        heading: 'Einkauf nach bestätigtem Umfang',
        body: 'Bauteile werden erst nach bestätigtem Beschaffungsplan, freigegebenen Alternativen, Stückzahl, Bestückungsumfang und Angebotsannahmen beschafft. So bleibt die Bauteilbeschaffung mit dem PCBA-Projekt verbunden.',
      },
    ],
    bullets: [
      'BOM-Vollständigkeit und MPN-Klarheit prüfen',
      'Abgekündigte, schwer verfügbare oder riskante Bauteile markieren',
      'Gehäusekompatibilität gegen Gerber/CPL prüfen, wenn verfügbar',
      'Kundenfreigabe vor Alternativen oder Einkauf',
      'Beschaffungsplan mit Turnkey-PCBA-Umfang verbinden',
    ],
    workflow: [
      'BOM mit MPNs, Designatoren, Mengen, Gehäusen und Hinweisen senden',
      'Fehlende MPNs, abgekündigte Bauteile, Verfügbarkeit und Gehäuserisiken markieren',
      'Gerber, CPL, Zeichnungen, Stückzahl und Prüfhinweise gemeinsam prüfen, wenn verfügbar',
      'Alternativen vor dem Einkauf mit dem Kunden abstimmen',
      'Beschaffungsumfang als Teil des PCBA-Angebots bestätigen',
    ],
    filesNeeded: commonFilesDe,
    relatedLinks: [
      { label: 'Turnkey-PCBA-Service aus China', href: '/de/turnkey-pcb-assembly' },
      { label: 'Prototypen-PCBA prüfen lassen', href: '/de/prototype-pcb-assembly' },
      { label: 'PCBA-Angebot aus China', href: '/de/china-pcb-assembly' },
      { label: 'BOM zur Risikoprüfung senden', href: '/de/contact#project-files' },
    ],
    ctaHeading: 'BOM für Beschaffungsrisiken prüfen lassen',
    ctaBody:
      'Senden Sie Ihre BOM mit MPNs, Mengen, Designatoren, Gehäusen, freigegebenen Alternativen und No-Substitute-Hinweisen. Wenn Gerber, CPL, Zeichnungen oder Prüfhinweise vorliegen, senden Sie diese mit, damit Beschaffungsrisiken und Bestückungsumfang zusammen geprüft werden können.',
    primaryCtaLabel: 'BOM zur Risikoprüfung senden',
    faq: [
      {
        question: 'Was passiert, wenn MPNs fehlen?',
        answer:
          'Eine BOM mit fehlenden MPNs kann trotzdem geprüft werden. Huitai markiert unklare Zeilen, Gehäusefragen und Bauteile, die vor Angebot oder Einkauf eine Kundenbestätigung benötigen.',
      },
      {
        question: 'Wie werden abgekündigte oder nicht verfügbare Bauteile behandelt?',
        answer:
          'Abgekündigte, nicht verfügbare oder instabile Beschaffungspositionen werden während der BOM-Prüfung markiert. Huitai kann Optionen oder Alternativen vorschlagen, ersetzt Bauteile aber nicht ohne Kundenfreigabe.',
      },
      {
        question: 'Wer gibt Alternativen frei?',
        answer:
          'Der Kunde gibt Alternativen vor Einkauf oder Bestückung frei. Huitai kann Optionen und Risiken erklären, aber der Austausch erfolgt nicht automatisch.',
      },
      {
        question: 'Werden Gerber und BOM gemeinsam geprüft?',
        answer:
          'Ja, wenn verfügbar. Gerber, BOM, CPL-/Pick-and-Place-Daten, Zeichnungen, Stückzahl und Prüfhinweise werden zusammen geprüft, damit Beschaffungsrisiko und Bestückungsumfang zum tatsächlichen PCBA-Build passen.',
      },
      {
        question: 'Wann werden Bauteile eingekauft?',
        answer:
          'Bauteile werden nach bestätigtem Beschaffungsplan, Kundenfreigabe für Alternativen, Stückzahl, Bestückungsumfang und Angebotsannahmen eingekauft.',
      },
    ],
  },
  'prototype-pcb-assembly': {
    slug: 'prototype-pcb-assembly',
    title: 'Prototypenfertigung für Leiterplattenbestückung und PCBA',
    seoTitle: 'PCBA-Prototypenfertigung aus China | Datei- & BOM-Prüfung',
    metaDescription:
      'PCBA-Prototypenfertigung aus China: Gerber, BOM, CPL, Zeichnungen, Stückzahl und Prüfhinweise vor Aufbau, Bauteilbeschaffung und SMT-Bestückung prüfen lassen.',
    eyebrow: 'PCBA-PROTOTYPENFERTIGUNG',
    primaryKeyword: 'PCBA-Prototypenfertigung aus China',
    serviceName: 'PCBA-Prototypenfertigung aus China',
    serviceType: 'Prototypen-PCBA-Bestückung',
    quickAnswer:
      'PCBA-Prototypenfertigung hilft Entwicklungsteams, Design-Dateien, BOM-Reife, Bauteilbeschaffung, Bestückbarkeit und Prüfanforderungen vor einer Kleinserie zu validieren.',
    intro:
      'Laden Sie Gerber-Daten, BOM, CPL- oder Pick-and-Place-Daten, Zeichnungen, Stückzahl, Musterfotos und Projekthinweise für eine Prototypenprüfung hoch. Huitai prüft Dateivollständigkeit, BOM-Risiken, Revisionen, SMT-/DIP-Umfang, Prüfunterstützung und den Übergang zur Kleinserie.',
    sections: [
      {
        heading: 'Dateiprüfung für Prototypen',
        body: 'Prototypen zeigen häufig Fragen zu Footprints, Orientierung, BOM, Zeichnungen, CPL und Prüfmethoden. Huitai prüft die verfügbaren Dateien und markiert fehlende Informationen vor Angebot oder Fertigungsplanung.',
      },
      {
        heading: 'Was vor dem Aufbau hilfreich ist',
        body: 'Gerber- und Bohrdaten, BOM mit MPNs, CPL-/Pick-and-Place-Daten, Bestückungszeichnungen, Stückzahl, Revisionshinweise, Musterfotos, Testanweisungen, Firmware oder Akzeptanzkriterien helfen bei der Prüfung.',
      },
      {
        heading: 'BOM-Risiken vor dem Prototypenaufbau',
        body: 'Vor dem Einkauf prüft Huitai fehlende MPNs, abgekündigte oder schwer verfügbare Bauteile, Gehäusekompatibilität, lange Beschaffungszeiten und Positionen ohne erlaubte Alternative.',
      },
      {
        heading: 'Umgang mit Revisionen',
        body: 'Wenn der Prototyp unter Revision steht, senden Sie bitte die neuesten Dateien und markieren Sie Änderungen zur vorherigen Version. So werden BOM, CPL, Zeichnungen und Angebotsannahmen nicht verwechselt.',
      },
      {
        heading: 'Vom Prototyp zur Kleinserie',
        body: 'Feedback aus dem Prototypen kann BOM, Bauteilfreigaben, Bestückungshinweise, Inspektionspunkte und Prüfrahmen vor der Kleinserie verbessern.',
      },
    ],
    bullets: [
      'Prüfung der Prototypen-Dateien vor Angebot',
      'Gerber, BOM, CPL, Zeichnungen, Stückzahl und Projektnotizen prüfen',
      'BOM-Risiken und kundenfreigegebene Alternativen klären',
      'Revisionen vor Einkauf und Bestückung berücksichtigen',
      'Prüfunterstützung nach bestätigten Vorgaben besprechen',
    ],
    workflow: [
      'Prototypen-Dateien, Stückzahl, Revisionen und Prüfhinweise senden',
      'Fehlende Dateien, BOM-Risiken und Bestückbarkeit prüfen',
      'Alternativen nur nach Kundenfreigabe bestätigen',
      'SMT-/DIP-Bestückung, Inspektion und abgestimmte Prüfung koordinieren',
      'Prototypenfeedback für die spätere Kleinserie nutzen',
    ],
    filesNeeded: commonFilesDe,
    relatedLinks: [
      { label: 'BOM-Risiken vor dem Aufbau prüfen', href: '/de/bom-sourcing-pcb-assembly' },
      { label: 'Turnkey-PCBA-Service aus China', href: '/de/turnkey-pcb-assembly' },
      { label: 'PCBA-Angebot aus China', href: '/de/china-pcb-assembly' },
      { label: 'Prototypen-Dateien hochladen', href: '/de/contact#project-files' },
    ],
    ctaHeading: 'Prototypen-Dateien prüfen lassen',
    ctaBody:
      'Senden Sie Gerber, BOM, CPL-/Pick-and-Place-Daten, Zeichnungen, Stückzahl, Musterfotos, Revisionshinweise und Prüfanforderungen. Huitai prüft Prototypen-PCBA, BOM-Risiken, Bestückungsdetails und Prüfbedarf vor dem Angebot.',
    primaryCtaLabel: 'Prototypen-Dateien hochladen',
    faq: [
      {
        question: 'Können unvollständige Dateien geprüft werden?',
        answer:
          'Ja. Senden Sie verfügbare Gerber-Daten, BOM, Zeichnungen, Fotos, Revisionshinweise oder eine Projektbeschreibung. Huitai kann fehlende Punkte vor Angebot oder Fertigungsplanung identifizieren.',
      },
      {
        question: 'Was wird vor dem Aufbau benötigt?',
        answer:
          'Vor dem Aufbau sollten Gerber- und Bohrdaten, BOM, CPL- oder Pick-and-Place-Daten, Bestückungszeichnungen, Stückzahl, Revisionen sowie Prüf- oder Inspektionsanforderungen geklärt werden.',
      },
      {
        question: 'Wie werden BOM-Risiken behandelt?',
        answer:
          'Huitai prüft fehlende MPNs, abgekündigte oder nicht verfügbare Bauteile, Gehäusekompatibilität und mögliche Alternativen. Alternativen werden vor Einkauf oder Bestückung mit dem Kunden abgestimmt.',
      },
      {
        question: 'Können Revisionen geprüft werden?',
        answer:
          'Ja. Senden Sie das aktuelle Revisionspaket und markieren Sie Änderungen zur vorherigen Version. Revisionshinweise helfen, BOM, CPL, Zeichnungen und Angebotsannahmen zusammenzuhalten.',
      },
      {
        question: 'Wie unterstützt Prototypenfeedback die Kleinserie?',
        answer:
          'Prototypenfeedback kann Bestückungshinweise, Bauteilfreigaben, Inspektionspunkte, Prüfrahmen und BOM-Entscheidungen verbessern, bevor ein Projekt in die Kleinserie geht.',
      },
    ],
  },
};
