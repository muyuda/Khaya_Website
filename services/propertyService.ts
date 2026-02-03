// services/propertyService.ts
import { Property, Agent, Project, Unit } from '../types';

const BASE_URL = process.env.VITE_BACKEND_API_URL;

if (!BASE_URL) {
  console.error('VITE_BACKEND_API_URL is not defined. Please set it in your .env file.');
  // Fallback to a default or throw an error to prevent further issues
  // For now, we'll just log an error and use an empty string for BASE_URL
  // In a production app, you might want a more robust error handling.
}

// --- Helper for API calls ---
async function fetchData<T>(endpoint: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error('Backend API URL is not configured.');
  }
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
}

// --- Main Property Functions ---

export const getProperties = async (): Promise<Property[]> => {
  console.log('Fetching all properties from backend');
  return fetchData<Property[]>('/properties');
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  console.log(`Fetching property with id: ${id} from backend`);
  return fetchData<Property>(`/properties/${id}`);
};

export const createProperty = async (newPropertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
  // This function still uses mock data. Connect to backend API for actual creation.
  console.warn('createProperty is using mock data and not connected to the backend.');
  const response = await fetch(`${BASE_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPropertyData),
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property | undefined> => {
  // This function still uses mock data. Connect to backend API for actual updates.
  console.warn('updateProperty is using mock data and not connected to the backend.');
  const response = await fetch(`${BASE_URL}/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  // This function still uses mock data. Connect to backend API for actual deletion.
  console.warn('deleteProperty is using mock data and not connected to the backend.');
  const response = await fetch(`${BASE_URL}/properties/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.ok;
};


// --- CMS-Specific Logic ---

export const setPropertyStatus = async (id: string, status: 'published' | 'draft'): Promise<Property | undefined> => {
  // This function now attempts to connect to the backend for status updates.
  console.log(`Setting status for property ${id} to ${status} via backend.`);
  const response = await fetch(`${BASE_URL}/properties/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export const assignAgentToProperty = async (propertyId: string, agentId: string): Promise<Property | undefined> => {
  // This function now attempts to connect to the backend for agent assignment.
  console.log(`Assigning agent ${agentId} to property ${propertyId} via backend.`);
  const response = await fetch(`${BASE_URL}/properties/${propertyId}/agent`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ agentId }),
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};


// --- Related Data Functions ---

export const getAgents = async (): Promise<Agent[]> => {
    console.log('Fetching all agents from backend');
    return fetchData<Agent[]>('/agents');
};

export const getProjects = async (): Promise<Project[]> => {
    console.log('Fetching all projects from backend');
    return fetchData<Project[]>('/projects');
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
    console.log(`Fetching project with id: ${id} from backend`);
    return fetchData<Project>(`/projects/${id}`);
}

export const getUnits = async (): Promise<Unit[]> => {
    console.log('Fetching all units from backend');
    return fetchData<Unit[]>('/units');
}

export const getUnitById = async (id: string): Promise<Unit | undefined> => {
    console.log(`Fetching unit with id: ${id} from backend`);
    return fetchData<Unit>(`/units/${id}`);
}

export const getUnitsByProjectId = async (projectId: string): Promise<Unit[]> => {
    console.log(`Fetching units for project with id: ${projectId} from backend`);
    return fetchData<Unit[]>(`/projects/${projectId}/units`);
}