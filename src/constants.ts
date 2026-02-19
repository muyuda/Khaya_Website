import { Project, Unit, Bank } from './types';

// Verified Working Images
const IMG_ROSE_QUARTZ = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';
const IMG_LUMINA = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80';
const IMG_QUARTZ_LOFT = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';
const IMG_SERENITY_LAKE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80';
const IMG_MENTENG = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80';

// Helper to create a gallery mix
const getGallery = (mainImg: string) => [
  mainImg,
  IMG_QUARTZ_LOFT,
  IMG_ROSE_QUARTZ,
  IMG_LUMINA,
  IMG_MENTENG,
  IMG_SERENITY_LAKE
];

export const MOCK_PROJECTS: Project[] = [
];

// Generator to ensure 5 units per project
const generateMockUnits = (): Unit[] => {
  const units: Unit[] = [];
  
  MOCK_PROJECTS.forEach(project => {
    // Determine base price based on project info roughly
    let basePrice = 0;
    const priceStr = project.priceRange.replace(/[^0-9.]/g, ''); 
    // Very rough parse, just setting reasonable defaults based on type
    if (project.propertyType === 'Apartment') basePrice = 800000000;
    else if (project.propertyType === 'Villa') basePrice = 5000000000;
    else basePrice = 1500000000;

    // Create 5 variants
    for (let i = 1; i <= 5; i++) {
        const isPremium = i > 3;
        const multiplier = 1 + (i * 0.15);
        const currentPrice = basePrice * multiplier;
        
        // Varying data based on index
        const bedroomCount = project.propertyType === 'Apartment' ? (i % 3) + 1 : (i % 4) + 2;
        const bathroomCount = Math.max(1, bedroomCount - 1);
        const landArea = project.propertyType === 'Apartment' ? 0 : 60 + (i * 15);
        const buildingArea = project.propertyType === 'Apartment' ? 30 + (i * 12) : 45 + (i * 20);
        
        // Generate Type Name
        let typeName = '';
        if (project.propertyType === 'Apartment') {
            typeName = i === 1 ? 'Studio' : `${i-1} Bedroom ${isPremium ? 'Premier' : 'Suite'}`;
        } else {
            typeName = `Type ${buildingArea}/${landArea}`;
        }

        units.push({
            id: `u_${project.id}_${i}`,
            projectId: project.id,
            projectName: project.name,
            type: typeName,
            category: project.category,
            price: currentPrice,
            priceDisplay: `IDR ${(currentPrice / 1000000000).toFixed(1)} M`,
            location: project.location,
            bedrooms: bedroomCount,
            bathrooms: bathroomCount,
            carports: project.propertyType === 'Apartment' ? 1 : Math.min(2, Math.ceil(i/2)),
            landArea: landArea,
            buildingArea: buildingArea,
            imageUrl: project.imageUrl, // Inherit project image (guaranteed valid)
            galleryUrls: getGallery(project.imageUrl),
            description: `A stunning ${typeName} unit in ${project.name}. Featuring modern ${project.propertyType.toLowerCase()} design with high-quality finishes. Perfect for ${isPremium ? 'luxury living' : 'starting your family'}.`,
            specifications: ['Smart Door Lock', 'High Speed Internet Ready', 'Premium Sanitary', isPremium ? 'Marble Floor' : 'Homogeneous Tile'],
            facilities: ['24/7 Security', 'Parking', 'Garden Access', 'Children Playground'],
            promo: i === 1 ? 'Early Bird Discount 5%' : 'Free Furnished Kitchen'
        });
    }
  });

  return units;
};

export const MOCK_UNITS: Unit[] = generateMockUnits();

export const BANKS: Bank[] = [
  {
    id: 'bca',
    name: 'BCA',
    logo: 'https://placehold.co/100x50/2AADC1/ffffff?text=BCA',
    products: [
        { name: 'KPR First', rate: 3.5, fixedYears: 3 },
        { name: 'KPR Fix & Cap', rate: 5.5, fixedYears: 5 },
        { name: 'KPR Refinance', rate: 7.0, fixedYears: 2 }
    ],
    requirements: ['KTP', 'NPWP', 'Slip Gaji 3 Bulan', 'Rekening Koran 3 Bulan']
  },
  {
    id: 'mandiri',
    name: 'Mandiri',
    logo: 'https://placehold.co/100x50/FE7EC7/ffffff?text=MANDIRI',
    products: [
        { name: 'KPR Millenial', rate: 3.8, fixedYears: 3 },
        { name: 'KPR Multiguna', rate: 8.5, fixedYears: 5 },
        { name: 'KPR Easy Start', rate: 4.5, fixedYears: 10 }
    ],
    requirements: ['KTP', 'NPWP', 'SPT Tahunan', 'Slip Gaji']
  },
  {
    id: 'cimb',
    name: 'CIMB Niaga',
    logo: 'https://placehold.co/100x50/D65E9F/ffffff?text=CIMB',
    products: [
        { name: 'KPR Xtra', rate: 4.2, fixedYears: 3 },
        { name: 'KPR Syariah', rate: 5.0, fixedYears: 5 }
    ],
    requirements: ['KTP', 'KK', 'Surat Nikah', 'Slip Gaji']
  },
  {
    id: 'bni',
    name: 'BNI',
    logo: 'https://placehold.co/100x50/F59E0B/ffffff?text=BNI',
    products: [
        { name: 'BNI Griya', rate: 3.9, fixedYears: 2 },
        { name: 'Griya Gue', rate: 4.75, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP', 'SK Pegawai']
  },
  {
    id: 'btn',
    name: 'BTN',
    logo: 'https://placehold.co/100x50/2563EB/ffffff?text=BTN',
    products: [
        { name: 'KPR Platinum', rate: 4.5, fixedYears: 2 },
        { name: 'KPR Gaess', rate: 5.2, fixedYears: 5 }
    ],
    requirements: ['KTP', 'Rekening Tabungan BTN']
  },
  {
    id: 'ocbc',
    name: 'OCBC',
    logo: 'https://placehold.co/100x50/DC2626/ffffff?text=OCBC',
    products: [
        { name: 'KPR Easy', rate: 3.99, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'panin',
    name: 'Panin',
    logo: 'https://placehold.co/100x50/16A34A/ffffff?text=PANIN',
    products: [
        { name: 'KPR Panin', rate: 4.0, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'danamon',
    name: 'Danamon',
    logo: 'https://placehold.co/100x50/EA580C/ffffff?text=DANAMON',
    products: [
        { name: 'KPR Danamon', rate: 4.1, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'maybank',
    name: 'Maybank',
    logo: 'https://placehold.co/100x50/FACC15/000000?text=MAYBANK',
    products: [
        { name: 'KPR Floating', rate: 9.0, fixedYears: 0 },
        { name: 'KPR Bebas', rate: 4.25, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  },
  {
    id: 'permata',
    name: 'Permata',
    logo: 'https://placehold.co/100x50/65A30D/ffffff?text=PERMATA',
    products: [
        { name: 'KPR Bijak', rate: 5.0, fixedYears: 3 }
    ],
    requirements: ['KTP', 'NPWP']
  }
];