import type { GraphData } from '$lib/data/GraphData';
import { type IDBPDatabase, openDB } from 'idb';
import type { ProjectData } from './ProjectData';
import type { ProjectsRepository } from './ProjectsRepository';

export class IndexedDBProjectsRepository implements ProjectsRepository {
	isInitialized = $state(false);
	onProjectsChange?: () => void;
	databaseInstance?: IDBPDatabase;

	get database() {
		if (this.databaseInstance) {
			return this.databaseInstance;
		} else {
			throw new Error('Database not initialized');
		}
	}

	getIsInitialized(): boolean {
		return this.isInitialized;
	}

	async initialize() {
		this.databaseInstance = await openDB('modulee', 1, {
			upgrade(database) {
				if (!database.objectStoreNames.contains('projects')) {
					database.createObjectStore('projects', { keyPath: 'id', autoIncrement: false });
				}
			},
		});
		this.isInitialized = true;
	}

	async getProjects() {
		return this.database.getAll('projects');
	}

	async getProject(id: string) {
		const projectData: ProjectData = await this.database.get('projects', id);
		return projectData;
	}

	async deleteProject(id: string) {
		await this.database.delete('projects', id);
		this.onProjectsChange?.();
	}

	async createProject(projectData: ProjectData) {
		const transaction = this.database.transaction('projects', 'readwrite');
		await Promise.all([transaction.store.add(projectData), transaction.done]);
		this.onProjectsChange?.();
	}

	async renameProject(id: string, name: string): Promise<void> {
		const transaction = this.database.transaction('projects', 'readwrite');
		const projectData: ProjectData = await transaction.store.get(id);
		projectData.name = name;
		await Promise.all([transaction.store.put(projectData), transaction.done]);
		this.onProjectsChange?.();
	}

	async updateProjectGraphData(id: string, graphData: GraphData): Promise<void> {
		const transaction = this.database.transaction('projects', 'readwrite');
		const projectData: ProjectData = await transaction.store.get(id);
		projectData.graphData = graphData;
		await Promise.all([transaction.store.put(projectData), transaction.done]);
		this.onProjectsChange?.();
	}
}
