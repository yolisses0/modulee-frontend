<script lang="ts">
	import Spinner from '$lib/ui/Spinner.svelte';
	import CreateProjectButton from './CreateProjectButton.svelte';
	import { getProjectsRepository } from './getProjectsRepository';
	import ImportProjectButton from './ImportProjectButton.svelte';
	import ProjectList from './ProjectList.svelte';

	const projectsRepository = getProjectsRepository();

	let projectsDataPromise = $state(projectsRepository.getProjects());
	projectsRepository.onProjectsChange = () => {
		projectsDataPromise = projectsRepository.getProjects();
	};
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-col gap-4 p-4">
		<div class="flex h-10 flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">Projects</h1>
			<div class="flex-1"></div>
			<ImportProjectButton />
			<CreateProjectButton />
		</div>
		<div>
			{#await projectsDataPromise}
				<div class="flex h-full flex-1 flex-col items-center p-8">
					<Spinner></Spinner>
				</div>
			{:then projectsData}
				<ProjectList {projectsData} />
			{:catch error}
				<div class="text-red-500">
					<div>It was not possible to load the projects</div>
					<div>{error}</div>
				</div>
			{/await}
		</div>
	</div>
</div>
