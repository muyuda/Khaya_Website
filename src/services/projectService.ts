// services/projectService.ts
import { MOCK_PROJECTS, MOCK_UNITS } from '../constants';
import { Project, Unit } from '../types';

const processedProjects: Project[] = MOCK_PROJECTS.map(mockProject => {
    const unitsForProject: Unit[] = MOCK_UNITS.filter(unit => unit.projectId === mockProject.id);
    const processedUnits: Unit[] = unitsForProject.map(unit => ({
        ...unit,
        imageUrl: unit.galleryUrls[0] || 'https://via.placeholder.com/400x300?text=No+Image',
        images: unit.galleryUrls,
        description: unit.description || 'No description available.',
        specifications: unit.specifications || ['No specifications listed.'],
        facilities: unit.facilities || ['No facilities listed.'],
        promo: unit.promo || 'No promo available.',
    }));
    return {
        ...mockProject,
        heroImage: mockProject.heroImage || mockProject.imageUrl,
        units: processedUnits,
    };
});

/**
 * Fetches a list of all projects from the mock data.
 * @returns A promise that resolves to an array of Project objects with nested units.
 */
export const getProjects = async (): Promise<Project[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    return processedProjects;
  } catch (error) {
    console.error('Error fetching projects from mock data:', error);
    throw error;
  }
};

/**
 * Fetches a single project by its ID from the mock data.
 * @param id The unique identifier of the project to fetch.
 * @returns A promise that resolves to a Project object with nested units.
 */
export const getProjectById = async (id: string): Promise<Project | undefined> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    const project = processedProjects.find(p => p.id === id);
    return project;
  } catch (error) {
    console.error(`Error fetching project with id ${id} from mock data:`, error);
    throw error;
  }
};

/**
 * Fetches a single unit by its ID from the mock data.
 * @param id The unique identifier of the unit to fetch.
 * @returns A promise that resolves to a Unit object.
 */
export const getUnitById = async (id: string): Promise<Unit | undefined> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
      const allUnits = processedProjects.flatMap(p => p.units);
      const unit = allUnits.find(u => u.id === id);
      return unit;
    } catch (error) {
      console.error(`Error fetching unit with id ${id} from mock data:`, error);
      throw error;
    }
  };
