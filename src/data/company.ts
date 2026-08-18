/**
 * Date legale ale firmei. NU se traduc — sunt identice în toate limbile.
 * Sursă: antetul oficial al firmei.
 */
export const company = {
  legalName: 'CL Accounting Reporting SRL',
  brandName: 'CLAR EXPERT',
  tagline: 'accounting & reporting',
  regCom: 'J40/16996/2020',
  vatId: 'RO 35695768',
  taxId: '35695768',
  vatPayer: true,
  ceccar: '11817',
  foundedYear: 2020,
  email: 'office@clar-expert.com',
  phones: [
    { display: '0756 093 660', tel: '+40756093660', type: 'mobile' },
    { display: '0728 008 141', tel: '+40728008141', type: 'mobile' },
    { display: '0318 220 138', tel: '+40318220138', type: 'landline' },
  ],
  /** Adresa unde se desfășoară efectiv activitatea */
  office: {
    street: 'Str. Av. Petre Crețu nr. 71',
    locality: 'București',
    district: 'Sector 1',
    country: 'RO',
    mapsQuery: 'Strada Aviator Petre Crețu 71, București',
  },
  /** Sediul social înregistrat la Registrul Comerțului */
  registeredOffice: {
    street: 'Str. Paris nr. 36',
    locality: 'București',
    district: 'Sector 1',
    country: 'RO',
  },
  // TODO de completat de client
  openingHours: null as string | null, // ex. 'Mo-Fr 09:00-17:00'
} as const;

export type Company = typeof company;
