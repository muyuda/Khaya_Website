export type PropertyCategory = 'Primary' | 'Secondary';
export type PropertyType = 'House' | 'Apartment' | 'Ruko' | 'Villa';

export interface Project {
  id: string;
  name: string;
  category: PropertyCategory;
  propertyType: PropertyType;
  developer: string;
  priceRange: string;
  location: string;
  imageUrl: string;
  isHot?: boolean;
  isNew?: boolean;
  description?: string;
}

export interface Unit {
  id: string;
  projectId: string;
  projectName: string;
  type: string;
  category: PropertyCategory;
  price: number; // In Billions or Millions, stored as number for calc
  priceDisplay: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  carports: number;
  landArea: number; // LT
  buildingArea: number; // LB
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  specifications: string[];
  facilities: string[];
  promo: string;
}

export interface Product {
  name: string;
  rate: number; // percentage
  fixedYears: number;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  products: Product[];
  requirements: string[];
}

export interface KPRCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}