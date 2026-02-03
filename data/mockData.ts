// data/mockData.ts
import { Agent, Project, Property, Media, Unit } from '../types';

export const mockAgents: Agent[] = [
  { id: 'agent-1', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 'agent-2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321' },
];

export const mockProjects: Project[] = [
  { id: 'proj-1', name: 'Sentosa Residence', developer: 'Maju Jaya Dev', location: 'Jakarta', description: 'A beautiful residence in the heart of Jakarta.', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop', priceRange: '1M - 2M', category: 'Primary', propertyType: 'House' },
  { id: 'proj-2', name: 'Permata Indah', developer: 'Maju Jaya Dev', location: 'Surabaya', description: 'A beautiful residence in the heart of Surabaya.', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop', priceRange: '500K - 1M', category: 'Secondary', propertyType: 'Apartment' },
];

const mockMedia: Media[] = [
    { id: 'media-1', url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop', altText: 'Modern house' },
    { id: 'media-2', url: 'https://images.unsplash.com/photo-1588880331179-83b074453bca?q=80&w=2070&auto=format&fit=crop', altText: 'Luxury villa' },
    { id: 'media-3', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', altText: 'Apartment building' },
];

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern House in Sentosa Residence',
    description: 'A beautiful modern house with a spacious garden.',
    price: 2500000000,
    location: 'Jakarta',
    projectId: 'proj-1',
    agentId: 'agent-1',
    propertyType: 'House',
    bedrooms: 4,
    bathrooms: 3,
    carports: 2,
    landArea: 300,
    buildingArea: 200,
    status: 'published',
    tags: ['Primary', 'New'],
    createdAt: new Date('2023-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2023-10-20T15:30:00Z').toISOString(),
    mainImage: mockMedia[0],
    gallery: [mockMedia[0], mockMedia[1]],
  },
  {
    id: 'prop-2',
    title: 'Luxury Villa with Ocean View',
    description: 'Stunning villa with a private pool and direct ocean access.',
    price: 7000000000,
    location: 'Bali',
    agentId: 'agent-2',
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 5,
    carports: 3,
    landArea: 1000,
    buildingArea: 600,
    status: 'published',
    tags: ['Featured'],
    createdAt: new Date('2023-03-01T12:00:00Z').toISOString(),
    updatedAt: new Date('2023-11-05T18:00:00Z').toISOString(),
    mainImage: mockMedia[1],
    gallery: [mockMedia[1], mockMedia[2]],
  },
  {
    id: 'prop-3',
    title: 'Cozy Apartment in City Center',
    description: 'A cozy apartment perfect for a small family or young professionals.',
    price: 800000000,
    location: 'Surabaya',
    projectId: 'proj-2',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    landArea: 80,
    buildingArea: 75,
    status: 'draft',
    tags: [],
    createdAt: new Date('2023-05-10T09:00:00Z').toISOString(),
    updatedAt: new Date('2023-09-15T14:00:00Z').toISOString(),
    mainImage: mockMedia[2],
    gallery: [mockMedia[2]],
  },
];

export const mockUnits: Unit[] = [
    {
        id: 'unit-1',
        projectId: 'proj-1',
        projectName: 'Sentosa Residence',
        type: 'Type A',
        category: 'Primary',
        price: 1500000000,
        priceDisplay: '1.5 M',
        location: 'Jakarta',
        bedrooms: 3,
        bathrooms: 2,
        carports: 1,
        landArea: 120,
        buildingArea: 90,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        galleryUrls: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'],
        description: 'A cozy 3-bedroom unit.',
        specifications: ['Slab foundation', 'Wood framing', 'Asphalt shingles'],
        facilities: ['Pool', 'Gym'],
        promo: 'Free kitchen set'
    },
    {
        id: 'unit-2',
        projectId: 'proj-2',
        projectName: 'Permata Indah',
        type: 'Type B',
        category: 'Secondary',
        price: 750000000,
        priceDisplay: '750 Jt',
        location: 'Surabaya',
        bedrooms: 2,
        bathrooms: 1,
        carports: 1,
        landArea: 80,
        buildingArea: 60,
        imageUrl: 'https://images.unsplash.com/photo-1628744448845-817315a639a8?q=80&w=2070&auto=format&fit=crop',
        galleryUrls: ['https://images.unsplash.com/photo-1628744448845-817315a639a8?q=80&w=2070&auto=format&fit=crop'],
        description: 'A modern 2-bedroom unit.',
        specifications: ['Concrete foundation', 'Steel framing', 'Metal roofing'],
        facilities: ['Playground'],
        promo: '50% off for the first year'
    }
]

