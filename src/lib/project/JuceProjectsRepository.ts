import type { CommandData } from '$lib/editor/CommandData';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class JuceProjectsRepository implements ProjectsRepository {
	isInitialized = false;
	juceLibrary!: typeof import('../juce');

	async initialize(): Promise<void> {
		this.juceLibrary = await import('../juce');
		this.isInitialized = true;
	}

	getIsInitialized(): boolean {
		return this.isInitialized;
	}

	onProjectsChange?: (() => void) | undefined;

	async getProjects(): Promise<ProjectData[]> {
		const getProjects = this.juceLibrary.getNativeFunction('getProjects');
		const projectsJson = await getProjects();
		return JSON.parse(projectsJson);
	}

	async deleteProject(id: string): Promise<void> {
		const deleteProject = this.juceLibrary.getNativeFunction('getProjects');
		await deleteProject(id);
	}

	async getProject(id: string): Promise<ProjectData> {
		const getProject = this.juceLibrary.getNativeFunction('getProject');
		const projectJson = await getProject(id);
		console.log('here', projectJson);
		return JSON.parse(projectJson);
	}

	async addCommand(commandData: CommandData): Promise<void> {
		const addCommand = this.juceLibrary.getNativeFunction('addCommand');
		const commandDataJson = JSON.stringify(commandData);
		await addCommand(commandDataJson);
	}

	async createProject(projectData: ProjectData): Promise<void> {
		const createProject = this.juceLibrary.getNativeFunction('createProject');
		const projectDataJson = JSON.stringify(projectData);
		await createProject(projectDataJson);
	}
}
