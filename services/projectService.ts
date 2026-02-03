// services/projectService.ts
import axiosClient from '../api/axiosClient';
import { Project } from '../types';

/**
 * Fetches a list of all projects from the backend.
 * @returns A promise that resolves to an array of Project objects.
 */
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axiosClient.get<Project[]>('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetches a single project by its ID from the backend.
 * @param id The unique identifier of the project to fetch.
 * @returns A promise that resolves to a Project object.
 */
export const getProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await axiosClient.get<Project>(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};
