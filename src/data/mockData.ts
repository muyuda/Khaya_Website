// src/data/mockData.ts
import { MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { Project, Unit } from '../types';

// This file acts as an adapter to transform the flat MOCK_PROJECTS and MOCK_UNITS
// into a nested structure expected by ProjectDetailPage and UnitDetailPage.

export const projects: Project[] = MOCK_PROJECTS.map(mockProject => {
    // Find all units belonging to this project
    const unitsForProject: Unit[] = MOCK_UNITS.filter(unit => unit.projectId === mockProject.id);

    // Ensure unit has 'images' property which is an array of strings
    const processedUnits: Unit[] = unitsForProject.map(unit => ({
        ...unit,
        // Assuming galleryUrls is already an array of strings in MOCK_UNITS
        // We'll use the first image from galleryUrls as imageUrl for cards
        imageUrl: unit.galleryUrls[0] || 'https://via.placeholder.com/400x300?text=No+Image', // Fallback
        images: unit.galleryUrls, // The UI expects 'images' (array), not 'galleryUrls'
        // Add default description, specs, facilities if they are missing
        description: unit.description || 'No description available.',
        specifications: unit.specifications || ['No specifications listed.'],
        facilities: unit.facilities || ['No facilities listed.'],
        promo: unit.promo || 'No promo available.',
    }));

    return {
        ...mockProject,
        heroImage: mockProject.heroImage || mockProject.imageUrl, // Fallback to imageUrl if heroImage is missing
        units: processedUnits,
    };
});

// If there are other exports needed (e.g., mockAgents), they should be handled here as well.
// For now, we only need to export 'projects' in this specific structure.
