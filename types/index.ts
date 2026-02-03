// types/index.ts

/**
 * Represents the publication status of a CMS entity.
 */
export type CMSStatus = 'draft' | 'published';

/**
 * Represents special classifications for a property.
 */
export type PropertyTag = 'Primary' | 'New' | 'Featured';

/**
 * Represents a media item, typically an image or video.
 */
export interface Media {
  id: string;
  url: string;
  altText?: string;
}

/**
 * Represents a real estate agent.
 */
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

/**
 * Represents a housing project or development.
 */
export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  description?: string;
  imageUrl?: string;
  priceRange: string;
  category: PropertyCategory;
  propertyType: 'House' | 'Apartment' | 'Ruko' | 'Villa';
}

/**
 * The core Property interface, representing a single listing.
 */
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  
  // Linking to other entities
  projectId?: string; // Optional link to a project
  agentId?: string;   // Optional link to an agent

  // Property Details
  propertyType: 'House' | 'Apartment' | 'Ruko' | 'Villa';
  bedrooms: number;
  bathrooms: number;
  carports?: number;
  landArea: number; // in square meters
  buildingArea: number; // in square meters

  // CMS-specific fields
  status: CMSStatus;
  tags: PropertyTag[];
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string

  // Media
  mainImage: Media;
  gallery: Media[];
}

// Keep existing unrelated types if they are used elsewhere
export type PropertyCategory = 'Primary' | 'Secondary';

export interface Unit {
  id: string;
  projectId: string;
  projectName:string;
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
