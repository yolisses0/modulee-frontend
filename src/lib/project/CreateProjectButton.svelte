<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from './ProjectData';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		projectsRepository: ProjectsRepository;
	}

	let isLoading = $state(false);
	const { projectsRepository }: Props = $props();

	async function handleClick() {
		isLoading = true;
		const projectData: ProjectData = {
			commands: [],
			id: createId(),
			name: 'New project',
			// TODO consider using the same name than the project
			mainGroup: {
				id: createId(),
				name: 'Main group',
			},
		};
		await projectsRepository.createProject(projectData);
		goto('/projects/' + projectData.id);
	}
</script>

<button disabled={isLoading} class="common-button" onclick={handleClick}>
	<Fa icon={faPlus} />
	Create project
</button>
