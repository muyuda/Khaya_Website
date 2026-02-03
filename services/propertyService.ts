// services/propertyService.ts
import { Property, Agent, Project, Unit } from '../types';
import { mockProperties, mockAgents, mockProjects, mockUnits } from '../data/mockData';

// This is a mock database. In a real app, this would be your API calls.
let propertiesDB = [...mockProperties];
const agentsDB = [...mockAgents];
const projectsDB = [...mockProjects];
const unitsDB = [...mockUnits];

const simulateNetwork = (delay = 500) => new Promise(res => setTimeout(res, delay));

// --- Main Property Functions ---

export const getProperties = async (): Promise<Property[]> => {
  await simulateNetwork();
  console.log('Fetching all properties');
  return Promise.resolve(propertiesDB);
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  await simulateNetwork(300);
  console.log(`Fetching property with id: ${id}`);
  const property = propertiesDB.find(p => p.id === id);
  return Promise.resolve(property);
};

export const createProperty = async (newPropertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
  await simulateNetwork();
  const newProperty: Property = {
    ...newPropertyData,
    id: `prop-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  propertiesDB.push(newProperty);
  console.log('Created new property:', newProperty);
  return Promise.resolve(newProperty);
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property | undefined> => {
  await simulateNetwork();
  const index = propertiesDB.findIndex(p => p.id === id);
  if (index === -1) {
    console.error(`Property with id: ${id} not found`);
    return Promise.resolve(undefined);
  }
  const updatedProperty = {
    ...propertiesDB[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  propertiesDB[index] = updatedProperty;
  console.log(`Updated property with id: ${id}`, updatedProperty);
  return Promise.resolve(updatedProperty);
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  await simulateNetwork(700);
  const index = propertiesDB.findIndex(p => p.id === id);
  if (index === -1) {
    console.error(`Property with id: ${id} not found for deletion`);
    return Promise.resolve(false);
  }
  propertiesDB.splice(index, 1);
  console.log(`Deleted property with id: ${id}`);
  return Promise.resolve(true);
};


// --- CMS-Specific Logic ---

export const setPropertyStatus = async (id: string, status: 'published' | 'draft'): Promise<Property | undefined> => {
  return updateProperty(id, { status });
};

export const assignAgentToProperty = async (propertyId: string, agentId: string): Promise<Property | undefined> => {
  return updateProperty(propertyId, { agentId });
};


// --- Related Data Functions ---

export const getAgents = async (): Promise<Agent[]> => {
    await simulateNetwork(200);
    return Promise.resolve(agentsDB);
};

export const getProjects = async (): Promise<Project[]> => {
    await simulateNetwork(200);
    return Promise.resolve(projectsDB);
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
    await simulateNetwork(300);
    return Promise.resolve(projectsDB.find(p => p.id === id));
}

export const getUnits = async (): Promise<Unit[]> => {
    await simulateNetwork(500);
    return Promise.resolve(unitsDB);
}

export const getUnitById = async (id: string): Promise<Unit | undefined> => {
    await simulateNetwork(300);
    return Promise.resolve(unitsDB.find(u => u.id === id));
}

export const getUnitsByProjectId = async (projectId: string): Promise<Unit[]> => {
    await simulateNetwork(300);
    return Promise.resolve(unitsDB.filter(u => u.projectId === projectId));
}