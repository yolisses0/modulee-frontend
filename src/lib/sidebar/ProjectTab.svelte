<script lang="ts">
	import { getProjectsRepository } from '$lib/project/getProjectsRepository';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import type { InputBlurEvent } from '$lib/utils/InputBlurEvent';
	import ExportInternalModuleButton from './ExportProjectButton.svelte';

	const projectDataContext = getProjectDataContext();
	const projectsRepository = getProjectsRepository();

	function handleBlur(e: InputBlurEvent) {
		const value = e.currentTarget.value;
		projectsRepository.renameProject(projectDataContext.projectData.id, value);
	}
</script>

<div class="flex flex-col items-stretch gap-2 p-2">
	<label class="flex flex-col">
		Name
		<input
			type="text"
			onblur={handleBlur}
			value={projectDataContext.projectData?.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
	<ExportInternalModuleButton />
</div>
