// src/data/kprData.ts

export interface Product {
  id: string;
  name: string;
  rate: number;
  fixedYears: number;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  products: Product[];
  requirements?: string[]; // <-- Tambahan properti baru (opsional)
}

export const BANKS: Bank[] = [
  {
    id: 'bca', 
    name: 'BCA', 
    logo: 'https://placehold.co/100x50/00529C/ffffff?text=BCA',
    products: [
      { id: 'bca_1', name: 'KPR Fix 3 Thn', rate: 3.75, fixedYears: 3 }, 
      { id: 'bca_2', name: 'KPR Fix 5 Thn', rate: 4.50, fixedYears: 5 }
    ]
  },
  {
    id: 'mandiri', 
    name: 'Mandiri', 
    logo: 'https://placehold.co/100x50/FBBF24/000000?text=MANDIRI',
    products: [
      { id: 'man_1', name: 'KPR Milenial', rate: 3.88, fixedYears: 3 }, 
      { id: 'man_2', name: 'KPR Fix Berjenjang', rate: 4.25, fixedYears: 5 }
    ]
  },
  {
    id: 'cimb', 
    name: 'CIMB Niaga', 
    logo: 'https://placehold.co/100x50/7F1D1D/ffffff?text=CIMB',
    products: [
      { id: 'cimb_1', name: 'KPR Xtra', rate: 5.00, fixedYears: 5 }
    ]
  },
  {
    id: 'bni',
    name: 'BNI',
    logo: 'https://placehold.co/100x50/F59E0B/ffffff?text=BNI',
    products: [
        { id: 'bni_1', name: 'BNI Griya', rate: 3.9, fixedYears: 2 },
        { id: 'bni_2', name: 'Griya Gue', rate: 4.75, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP', 'SK Pegawai']
  },
  {
    id: 'btn',
    name: 'BTN',
    logo: 'https://placehold.co/100x50/2563EB/ffffff?text=BTN',
    products: [
        { id: 'btn_1', name: 'KPR Platinum', rate: 4.5, fixedYears: 2 },
        { id: 'btn_2', name: 'KPR Gaess', rate: 5.2, fixedYears: 5 }
    ],
    requirements: ['KTP', 'Rekening Tabungan BTN']
  },
  {
    id: 'ocbc',
    name: 'OCBC',
    logo: 'https://placehold.co/100x50/DC2626/ffffff?text=OCBC',
    products: [
        { id: 'ocbc_1', name: 'KPR Easy', rate: 3.99, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'panin',
    name: 'Panin',
    logo: 'https://placehold.co/100x50/16A34A/ffffff?text=PANIN',
    products: [
        { id: 'panin_1', name: 'KPR Panin', rate: 4.0, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'danamon',
    name: 'Danamon',
    logo: 'https://placehold.co/100x50/EA580C/ffffff?text=DANAMON',
    products: [
        { id: 'dan_1', name: 'KPR Danamon', rate: 4.1, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'maybank',
    name: 'Maybank',
    logo: 'https://placehold.co/100x50/FACC15/000000?text=MAYBANK',
    products: [
        { id: 'maybank_1', name: 'KPR Floating', rate: 9.0, fixedYears: 0 },
        { id: 'maybank_2', name: 'KPR Bebas', rate: 4.25, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'permata',
    name: 'Permata',
    logo: 'https://placehold.co/100x50/65A30D/ffffff?text=PERMATA',
    products: [
        { id: 'permata_1', name: 'KPR Bijak', rate: 5.0, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  }
];